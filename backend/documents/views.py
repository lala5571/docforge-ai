from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from .models import Document
from .generator import create_pptx, create_docx
from groq import Groq
import json

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def generate_document(request):
    topic = request.data.get('topic')
    format = request.data.get('format', 'ppt')
    instructions = request.data.get('instructions', '')

    if not topic:
        return Response({'error': 'Topic required'}, status=400)

    if format == 'ppt':
        prompt = f"""Create a professional PowerPoint presentation for: "{topic}"
{f'Instructions: {instructions}' if instructions else ''}
Return ONLY this JSON, nothing else:
{{
    "title": "presentation title",
    "slides": [
        {{"slide_number": 1, "title": "slide title", "content": ["point 1", "point 2", "point 3"]}}
    ]
}}
Make 8 slides."""
    else:
        prompt = f"""Create a professional Word document for: "{topic}"
{f'Instructions: {instructions}' if instructions else ''}
Return ONLY this JSON, nothing else:
{{
    "title": "document title",
    "sections": [
        {{"heading": "Introduction", "content": "paragraph text here"}}
    ]
}}
Make 5 sections."""

    client = Groq(api_key=settings.GROQ_API_KEY)
    chat = client.chat.completions.create(
        messages=[{'role': 'user', 'content': prompt}],
        model='llama-3.1-8b-instant',
        max_tokens=2000,
        temperature=0.7
    )

    ai_text = chat.choices[0].message.content.strip()

    if '```json' in ai_text:
        ai_text = ai_text.split('```json')[1].split('```')[0]
    elif '```' in ai_text:
        ai_text = ai_text.split('```')[1].split('```')[0]

    ai_content = json.loads(ai_text.strip())

    doc = Document.objects.create(
        user=request.user if request.user.is_authenticated else None,
        topic=topic,
        format=format,
        instructions=instructions,
        status='generated'
    )

    if format == 'ppt':
        file_path = create_pptx(ai_content, str(doc.id))
    else:
        file_path = create_docx(ai_content, str(doc.id))

    return Response({
        'message': 'Document generated!',
        'document_id': str(doc.id),
        'content': ai_content,
        'price': 5 if format == 'ppt' else 7,
        'file': file_path
    })