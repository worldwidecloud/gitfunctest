// Fixed Comprehensive Grok Scoring System
const response = items[0].json;
let totalScore = 0;
let feedback = [];
let detailedAnalysis = {};
let content = ''; // Initialize content variable

if (response.choices && response.choices[0]) {
  content = response.choices[0].message.content;
  
  // 1. Logical Reasoning (25 points)
  let logicalScore = 0;
  if (content.toLowerCase().includes('cannot conclude') || content.toLowerCase().includes('insufficient')) {
    logicalScore = 25;
    feedback.push('✓ Correctly identified logical fallacy in syllogism');
  } else {
    feedback.push('✗ Failed to identify logical fallacy - concluded incorrectly');
  }
  
  // 2. Creative Problem Solving (25 points)
  let creativityScore = 0;
  if (content.toLowerCase().includes('height') || content.toLowerCase().includes('short') || content.toLowerCase().includes('reach') || content.toLowerCase().includes('umbrella')) {
    creativityScore = 25;
    feedback.push('✓ Correctly solved elevator puzzle with creative insight');
  } else {
    feedback.push('✗ Did not find the height/reach solution to elevator problem');
  }
  
  // 3. Structured Output (25 points)
  let structureScore = 0;
  const jsonMatch = content.match(/{[^}]*"analysis"[^}]*}/s);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.analysis && parsed.analysis.risk_level && parsed.analysis.recommendations) {
        structureScore = 25;
        feedback.push('✓ Provided valid JSON with correct schema');
      } else {
        structureScore = 15;
        feedback.push('⚠ JSON valid but missing required fields');
      }
    } catch (e) {
      structureScore = 5;
      feedback.push('⚠ Attempted JSON but invalid format');
    }
  } else {
    feedback.push('✗ Did not provide JSON response as requested');
  }
  
  // 4. Context Reasoning (15 points)
  let contextScore = 0;
  const contextKeywords = ['retention', 'cost', 'growth', 'efficiency', 'talent', 'revenue', 'margin'];
  const foundKeywords = contextKeywords.filter(keyword => content.toLowerCase().includes(keyword)).length;
  contextScore = Math.min(15, foundKeywords * 3);
  if (contextScore >= 12) {
    feedback.push('✓ Demonstrated strong contextual reasoning');
  } else if (contextScore >= 6) {
    feedback.push('⚠ Some contextual understanding shown');
  } else {
    feedback.push('✗ Limited contextual reasoning demonstrated');
  }
  
  // 5. Metacognitive Assessment (10 points)
  let metaScore = 0;
  if (content.toLowerCase().includes('confidence') && (content.includes('1-10') || /\b[1-9]\b/.test(content))) {
    metaScore = 10;
    feedback.push('✓ Provided metacognitive self-assessment');
  } else {
    feedback.push('✗ Did not provide confidence ratings as requested');
  }
  
  totalScore = logicalScore + creativityScore + structureScore + contextScore + metaScore;
  
  detailedAnalysis = {
    logical_reasoning: { score: logicalScore, max: 25, percentage: (logicalScore/25)*100 },
    creative_problem_solving: { score: creativityScore, max: 25, percentage: (creativityScore/25)*100 },
    structured_output: { score: structureScore, max: 25, percentage: (structureScore/25)*100 },
    context_reasoning: { score: contextScore, max: 15, percentage: (contextScore/15)*100 },
    metacognitive_assessment: { score: metaScore, max: 10, percentage: (metaScore/10)*100 }
  };
} else {
  // Handle case where there's no valid response
  feedback.push('✗ No valid response received from API');
  content = 'No response available';
  detailedAnalysis = {
    logical_reasoning: { score: 0, max: 25, percentage: 0 },
    creative_problem_solving: { score: 0, max: 25, percentage: 0 },
    structured_output: { score: 0, max: 25, percentage: 0 },
    context_reasoning: { score: 0, max: 15, percentage: 0 },
    metacognitive_assessment: { score: 0, max: 10, percentage: 0 }
  };
}

// Generate overall grade
function getGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  return 'D';
}

const overallPercentage = (totalScore / 100) * 100;

const report = {
  test_summary: {
    model: 'xAI Grok Model',
    test_date: new Date().toISOString(),
    overall_score: `${totalScore}/100`,
    overall_percentage: Math.round(overallPercentage * 100) / 100,
    overall_grade: getGrade(overallPercentage),
    token_usage: response.usage || 'Not available'
  },
  detailed_scores: detailedAnalysis,
  key_feedback: feedback,
  performance_insights: {
    strengths: Object.entries(detailedAnalysis)
      .filter(([_, data]) => data.percentage >= 80)
      .map(([category, _]) => category.replace('_', ' ')),
    areas_for_improvement: Object.entries(detailedAnalysis)
      .filter(([_, data]) => data.percentage < 60)
      .map(([category, _]) => category.replace('_', ' ')),
    consistency_rating: Math.min(...Object.values(detailedAnalysis).map(d => d.percentage)) >= 60 ? 'High' : 'Variable'
  },
  recommendations: overallPercentage >= 80 ? 
    ['Model demonstrates strong performance across most reasoning tasks', 'Suitable for complex analytical work'] :
    ['Performance varies by task type', 'Consider task-specific model selection'],
  raw_response: content.substring(0, 1000) + (content.length > 1000 ? '...' : ''),
  test_metadata: {
    response_length: content.length,
    contains_reasoning: content.toLowerCase().includes('because') || content.toLowerCase().includes('therefore'),
    contains_uncertainty: content.toLowerCase().includes('might') || content.toLowerCase().includes('possibly'),
    technical_depth: content.split(' ').length > 500 ? 'High' : 'Medium'
  }
};

return [{ json: report }];