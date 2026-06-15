from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from .models import Order
from documents.models import Document
import razorpay

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def create_order(request):
    document_id = request.data.get('document_id')

    try:
        doc = Document.objects.get(id=document_id)
    except Document.DoesNotExist:
        return Response({'error': 'Document not found'}, status=404)

    amount = settings.PPT_PRICE if doc.format == 'ppt' else settings.WORD_PRICE

    client = razorpay.Client(
        auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
    )

    razorpay_order = client.order.create({
        'amount': amount,
        'currency': 'INR',
        'payment_capture': 1
    })

    Order.objects.create(
        user=None,
        document=doc,
        amount=amount,
        razorpay_order_id=razorpay_order['id']
    )

    return Response({
        'order_id': razorpay_order['id'],
        'amount': amount,
        'currency': 'INR',
        'key': settings.RAZORPAY_KEY_ID,
        'document_id': str(doc.id)
    })


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def verify_payment(request):
    payment_id = request.data.get('razorpay_payment_id')
    order_id = request.data.get('razorpay_order_id')
    signature = request.data.get('razorpay_signature')

    client = razorpay.Client(
        auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
    )

    try:
        client.utility.verify_payment_signature({
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        })

        order = Order.objects.get(razorpay_order_id=order_id)
        order.status = 'paid'
        order.razorpay_payment_id = payment_id
        order.save()

        order.document.status = 'paid'
        order.document.save()

        return Response({
            'message': 'Payment successful!',
            'download_url': f'/media/clean/{order.document.id}.{order.document.format}x'
        })

    except Exception as e:
        return Response({'error': str(e)}, status=400)