# Grok 4 Intelligence Testing Workflow - User Guide

## Overview
Successfully created and deployed a comprehensive Grok 4 intelligence testing workflow in your n8n instance. This workflow systematically evaluates xAI's Grok 4 model across 5 key cognitive domains.

## Workflow Details
- **Name**: Grok 4 Intelligence Testing Suite
- **ID**: QjSc7YdP7lWlEJu4
- **Location**: http://localhost:5555 (your n8n instance)
- **Status**: Deployed and ready for execution

## Test Categories & Scoring

### 1. Logical Reasoning (25 points)
- **Test**: Syllogism analysis, sheep problem, jug puzzle, parallel processing
- **Scoring Criteria**: 
  - Correct logical fallacy identification
  - Step-by-step reasoning demonstration
  - Understanding of parallel vs sequential processing

### 2. Creative Problem Solving (25 points)
- **Test**: Elevator puzzle, cake cutting problem, new sport design, blender escape
- **Scoring Criteria**:
  - Creative insight (height/reach solution)
  - 3D spatial thinking
  - Novel problem-solving approaches

### 3. Structured Output (25 points)
- **Test**: JSON schema compliance for business analysis
- **Scoring Criteria**:
  - Valid JSON format
  - Required schema fields present
  - Appropriate data types and structure

### 4. Context Reasoning (15 points)
- **Test**: Strategic analysis of business metrics
- **Scoring Criteria**:
  - Use of relevant business terminology
  - Cross-referencing multiple data points
  - Strategic thinking demonstration

### 5. Metacognitive Assessment (10 points)
- **Test**: Self-confidence rating and explanation
- **Scoring Criteria**:
  - Numerical confidence ratings provided
  - Reasoning behind confidence levels
  - Self-awareness of capabilities

## Workflow Architecture

```
Manual Trigger → Config Setup → Grok 4 API Call → Comprehensive Scoring → Results Export
```

### Key Components:
1. **Configuration Node**: Sets up OpenRouter API credentials and model selection
2. **HTTP Request Node**: Sends comprehensive test prompt to Grok 4
3. **Function Node**: Advanced scoring algorithm with detailed feedback
4. **Export Node**: Sends results to httpbin.org for analysis

## How to Use

### Manual Execution (Recommended):
1. Open n8n at http://localhost:5555
2. Navigate to "Grok 4 Intelligence Testing Suite" workflow
3. Click the "Execute Workflow" button
4. Review results in the execution log

### API Execution:
```bash
# Note: Direct API execution may require workflow activation
curl -H "X-N8N-API-KEY: your-api-key" \
     -X POST "http://localhost:5555/api/v1/workflows/QjSc7YdP7lWlEJu4/execute"
```

## Expected Results

### Sample Output Structure:
```json
{
  "test_summary": {
    "model": "xAI Grok 4",
    "overall_score": "XX/100",
    "overall_percentage": XX.X,
    "overall_grade": "A/B/C/D",
    "token_usage": {...}
  },
  "detailed_scores": {
    "logical_reasoning": {"score": XX, "percentage": XX},
    "creative_problem_solving": {"score": XX, "percentage": XX},
    "structured_output": {"score": XX, "percentage": XX},
    "context_reasoning": {"score": XX, "percentage": XX},
    "metacognitive_assessment": {"score": XX, "percentage": XX}
  },
  "performance_insights": {
    "strengths": ["category1", "category2"],
    "areas_for_improvement": ["category3"],
    "consistency_rating": "High/Variable"
  },
  "recommendations": ["recommendation1", "recommendation2"]
}
```

## Interpreting Results

### Grade Scale:
- **A+ (90-100%)**: Exceptional performance - Grok 4 excels across all domains
- **A (80-89%)**: Strong performance - Suitable for complex reasoning tasks
- **B+ (70-79%)**: Good performance - Reliable for most applications
- **B (60-69%)**: Adequate performance - Consider task-specific usage
- **C (50-59%)**: Variable performance - Use with caution
- **D (<50%)**: Poor performance - Consider alternative models

### Key Metrics:
- **Consistency Rating**: Measures performance stability across categories
- **Strengths**: Categories where Grok 4 scored 80%+ 
- **Areas for Improvement**: Categories with <60% performance
- **Token Usage**: Efficiency metrics for cost analysis

## Advanced Features

### Customization Options:
1. **Temperature Adjustment**: Modify creativity vs consistency balance
2. **Max Tokens**: Adjust response length limits
3. **Test Categories**: Add/remove specific test domains
4. **Scoring Weights**: Customize importance of different categories

### Integration Possibilities:
- **Automated Testing**: Schedule regular model evaluations
- **Comparison Studies**: Test multiple models with same framework
- **Performance Monitoring**: Track model improvements over time
- **Custom Benchmarks**: Adapt tests for specific use cases

## Technical Specifications

### API Configuration:
- **Endpoint**: https://openrouter.ai/api/v1/chat/completions
- **Model**: xai/grok-4
- **Authentication**: Bearer token authentication
- **Rate Limits**: Managed by OpenRouter

### Error Handling:
- API timeout protection (30 seconds)
- Malformed response detection
- Fallback scoring for incomplete responses
- Detailed error logging

## Troubleshooting

### Common Issues:
1. **API Key Errors**: Verify OpenRouter API key is valid and has credits
2. **Timeout Issues**: Check network connectivity and OpenRouter status
3. **Invalid JSON**: Grok 4 occasionally produces malformed JSON - scorer handles this
4. **Low Scores**: Review test criteria - some answers may be creative but not match exact keywords

### Support:
- Workflow files saved in: `/Users/simonkelly/worldwidecloud/gitfunctest/context/`
- Test results exported to: httpbin.org for analysis
- n8n execution logs available in the interface

## Next Steps

1. **Execute the Test**: Run your first Grok 4 evaluation
2. **Analyze Results**: Review performance across all categories
3. **Compare Models**: Adapt workflow for other LLMs
4. **Optimize Usage**: Use insights to guide model selection for specific tasks

Your Grok 4 Intelligence Testing Suite is ready for comprehensive model evaluation!