import React, { useState } from 'react';
import InteractiveFlowchart from './InteractiveFlowchart';

const flowchartTemplates = {
  cicd: {
    name: 'CI/CD Pipeline',
    nodes: [
      { id: '1', type: 'input', data: { label: 'Code Commit' }, position: { x: 250, y: 25 } },
      { id: '2', data: { label: 'Build & Test' }, position: { x: 250, y: 125 } },
      { id: '3', data: { label: 'Security Scan' }, position: { x: 250, y: 225 } },
      { id: '4', data: { label: 'Deploy to Staging' }, position: { x: 100, y: 325 } },
      { id: '5', data: { label: 'Deploy to Production' }, position: { x: 400, y: 325 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e3-5', source: '3', target: '5' },
    ]
  },
  monitoring: {
    name: 'Monitoring & Alerting',
    nodes: [
      { id: '1', type: 'input', data: { label: 'Application' }, position: { x: 250, y: 25 } },
      { id: '2', data: { label: 'Metrics Collection' }, position: { x: 250, y: 125 } },
      { id: '3', data: { label: 'Alert Rules' }, position: { x: 100, y: 225 } },
      { id: '4', data: { label: 'Dashboard' }, position: { x: 400, y: 225 } },
      { id: '5', data: { label: 'Notification' }, position: { x: 100, y: 325 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e3-5', source: '3', target: '5' },
    ]
  },
  infrastructure: {
    name: 'Infrastructure as Code',
    nodes: [
      { id: '1', type: 'input', data: { label: 'IaC Template' }, position: { x: 250, y: 25 } },
      { id: '2', data: { label: 'Validation' }, position: { x: 250, y: 125 } },
      { id: '3', data: { label: 'Plan Review' }, position: { x: 250, y: 225 } },
      { id: '4', data: { label: 'Apply Changes' }, position: { x: 250, y: 325 } },
      { id: '5', data: { label: 'State Management' }, position: { x: 250, y: 425 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
    ]
  },
  incident: {
    name: 'Incident Response',
    nodes: [
      { id: '1', type: 'input', data: { label: 'Alert Triggered' }, position: { x: 250, y: 25 } },
      { id: '2', data: { label: 'Incident Created' }, position: { x: 250, y: 125 } },
      { id: '3', data: { label: 'Team Notified' }, position: { x: 100, y: 225 } },
      { id: '4', data: { label: 'Investigation' }, position: { x: 400, y: 225 } },
      { id: '5', data: { label: 'Resolution' }, position: { x: 250, y: 325 } },
      { id: '6', data: { label: 'Post-Mortem' }, position: { x: 250, y: 425 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e4-5', source: '4', target: '5' },
      { id: 'e5-6', source: '5', target: '6' },
    ]
  },
  microservices: {
    name: 'Microservices Deployment',
    nodes: [
      { id: '1', type: 'input', data: { label: 'Service Code' }, position: { x: 250, y: 25 } },
      { id: '2', data: { label: 'Container Build' }, position: { x: 250, y: 125 } },
      { id: '3', data: { label: 'Registry Push' }, position: { x: 250, y: 225 } },
      { id: '4', data: { label: 'Orchestrator' }, position: { x: 250, y: 325 } },
      { id: '5', data: { label: 'Service Mesh' }, position: { x: 100, y: 425 } },
      { id: '6', data: { label: 'Load Balancer' }, position: { x: 400, y: 425 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
      { id: 'e4-6', source: '4', target: '6' },
    ]
  },
  security: {
    name: 'Security Pipeline',
    nodes: [
      { id: '1', type: 'input', data: { label: 'Code Commit' }, position: { x: 250, y: 25 } },
      { id: '2', data: { label: 'SAST Scan' }, position: { x: 100, y: 125 } },
      { id: '3', data: { label: 'Dependency Check' }, position: { x: 400, y: 125 } },
      { id: '4', data: { label: 'Container Scan' }, position: { x: 250, y: 225 } },
      { id: '5', data: { label: 'DAST Testing' }, position: { x: 250, y: 325 } },
      { id: '6', data: { label: 'Compliance Check' }, position: { x: 250, y: 425 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
      { id: 'e5-6', source: '5', target: '6' },
    ]
  },
  jenkins: {
    name: 'Jenkins Pipeline',
    nodes: [
      { id: '1', type: 'input', data: { label: 'Git Webhook' }, position: { x: 250, y: 25 } },
      { id: '2', data: { label: 'Jenkins Build' }, position: { x: 250, y: 125 } },
      { id: '3', data: { label: 'Maven/Gradle' }, position: { x: 100, y: 225 } },
      { id: '4', data: { label: 'Unit Tests' }, position: { x: 400, y: 225 } },
      { id: '5', data: { label: 'SonarQube' }, position: { x: 250, y: 325 } },
      { id: '6', data: { label: 'Artifact Deploy' }, position: { x: 250, y: 425 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e4-5', source: '4', target: '5' },
      { id: 'e5-6', source: '5', target: '6' },
    ]
  },
  docker: {
    name: 'Docker Workflow',
    nodes: [
      { id: '1', type: 'input', data: { label: 'Dockerfile' }, position: { x: 250, y: 25 } },
      { id: '2', data: { label: 'Docker Build' }, position: { x: 250, y: 125 } },
      { id: '3', data: { label: 'Image Tag' }, position: { x: 250, y: 225 } },
      { id: '4', data: { label: 'Registry Push' }, position: { x: 250, y: 325 } },
      { id: '5', data: { label: 'Container Run' }, position: { x: 100, y: 425 } },
      { id: '6', data: { label: 'Health Check' }, position: { x: 400, y: 425 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
      { id: 'e4-6', source: '4', target: '6' },
    ]
  },
  kubernetes: {
    name: 'Kubernetes Deployment',
    nodes: [
      { id: '1', type: 'input', data: { label: 'YAML Manifest' }, position: { x: 250, y: 25 } },
      { id: '2', data: { label: 'kubectl apply' }, position: { x: 250, y: 125 } },
      { id: '3', data: { label: 'Pod Creation' }, position: { x: 250, y: 225 } },
      { id: '4', data: { label: 'Service Exposure' }, position: { x: 100, y: 325 } },
      { id: '5', data: { label: 'Ingress Config' }, position: { x: 400, y: 325 } },
      { id: '6', data: { label: 'Load Balancing' }, position: { x: 250, y: 425 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e4-6', source: '4', target: '6' },
      { id: 'e5-6', source: '5', target: '6' },
    ]
  },
  terraform: {
    name: 'Terraform Workflow',
    nodes: [
      { id: '1', type: 'input', data: { label: 'TF Config' }, position: { x: 250, y: 25 } },
      { id: '2', data: { label: 'terraform init' }, position: { x: 250, y: 125 } },
      { id: '3', data: { label: 'terraform plan' }, position: { x: 250, y: 225 } },
      { id: '4', data: { label: 'Review Changes' }, position: { x: 250, y: 325 } },
      { id: '5', data: { label: 'terraform apply' }, position: { x: 250, y: 425 } },
      { id: '6', data: { label: 'State Update' }, position: { x: 250, y: 525 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
      { id: 'e5-6', source: '5', target: '6' },
    ]
  },
  ansible: {
    name: 'Ansible Automation',
    nodes: [
      { id: '1', type: 'input', data: { label: 'Playbook' }, position: { x: 250, y: 25 } },
      { id: '2', data: { label: 'Inventory Check' }, position: { x: 250, y: 125 } },
      { id: '3', data: { label: 'SSH Connection' }, position: { x: 250, y: 225 } },
      { id: '4', data: { label: 'Task Execution' }, position: { x: 250, y: 325 } },
      { id: '5', data: { label: 'Config Apply' }, position: { x: 100, y: 425 } },
      { id: '6', data: { label: 'Status Report' }, position: { x: 400, y: 425 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-5', source: '4', target: '5' },
      { id: 'e4-6', source: '4', target: '6' },
    ]
  },
  lifecycle: {
    name: 'DevOps Lifecycle & Tools',
    nodes: [
      { id: '1', type: 'input', data: { label: '1. Plan' }, position: { x: 100, y: 50 } },
      { id: '1t', data: { label: 'Jira, Trello' }, position: { x: 100, y: 100 } },
      { id: '2', data: { label: '2. Code' }, position: { x: 300, y: 50 } },
      { id: '2t', data: { label: 'Git, GitHub' }, position: { x: 300, y: 100 } },
      { id: '3', data: { label: '3. Build' }, position: { x: 500, y: 50 } },
      { id: '3t', data: { label: 'Maven, Jenkins' }, position: { x: 500, y: 100 } },
      { id: '4', data: { label: '4. Test' }, position: { x: 700, y: 50 } },
      { id: '4t', data: { label: 'Selenium, JUnit' }, position: { x: 700, y: 100 } },
      { id: '5', data: { label: '5. Release' }, position: { x: 700, y: 200 } },
      { id: '5t', data: { label: 'GitLab CI/CD' }, position: { x: 700, y: 250 } },
      { id: '6', data: { label: '6. Deploy' }, position: { x: 500, y: 200 } },
      { id: '6t', data: { label: 'Docker, K8s' }, position: { x: 500, y: 250 } },
      { id: '7', data: { label: '7. Operate' }, position: { x: 300, y: 200 } },
      { id: '7t', data: { label: 'AWS, Azure' }, position: { x: 300, y: 250 } },
      { id: '8', data: { label: '8. Monitor' }, position: { x: 100, y: 200 } },
      { id: '8t', data: { label: 'Prometheus, Grafana' }, position: { x: 100, y: 250 } },
      { id: '9', data: { label: '9. Feedback' }, position: { x: 100, y: 350 } },
      { id: '9t', data: { label: 'New Relic, Jira' }, position: { x: 100, y: 400 } },
    ],
    edges: [
      { id: 'e1-1t', source: '1', target: '1t' },
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-2t', source: '2', target: '2t' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-3t', source: '3', target: '3t' },
      { id: 'e3-4', source: '3', target: '4' },
      { id: 'e4-4t', source: '4', target: '4t' },
      { id: 'e4-5', source: '4', target: '5' },
      { id: 'e5-5t', source: '5', target: '5t' },
      { id: 'e5-6', source: '5', target: '6' },
      { id: 'e6-6t', source: '6', target: '6t' },
      { id: 'e6-7', source: '6', target: '7' },
      { id: 'e7-7t', source: '7', target: '7t' },
      { id: 'e7-8', source: '7', target: '8' },
      { id: 'e8-8t', source: '8', target: '8t' },
      { id: 'e8-9', source: '8', target: '9' },
      { id: 'e9-9t', source: '9', target: '9t' },
      { id: 'e9-1', source: '9', target: '1' },
    ]
  }
};

export default function FlowchartSelector() {
  const [selectedTemplate, setSelectedTemplate] = useState('cicd');
  const [category, setCategory] = useState('all');

  const categories = {
    all: 'All Flowcharts',
    processes: 'DevOps Processes',
    tools: 'DevOps Tools'
  };

  const getFilteredTemplates = () => {
    if (category === 'processes') {
      return Object.fromEntries(
        Object.entries(flowchartTemplates).filter(([key]) => 
          ['cicd', 'monitoring', 'infrastructure', 'incident', 'microservices', 'security', 'lifecycle'].includes(key)
        )
      );
    }
    if (category === 'tools') {
      return Object.fromEntries(
        Object.entries(flowchartTemplates).filter(([key]) => 
          ['jenkins', 'docker', 'kubernetes', 'terraform', 'ansible'].includes(key)
        )
      );
    }
    return flowchartTemplates;
  };

  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <select 
          value={category} 
          onChange={(e) => {
            setCategory(e.target.value);
            const filtered = getFilteredTemplates();
            const firstKey = Object.keys(filtered)[0];
            if (firstKey) setSelectedTemplate(firstKey);
          }}
          style={{ padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '140px' }}
        >
          {Object.entries(categories).map(([key, name]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>
        <select 
          value={selectedTemplate} 
          onChange={(e) => setSelectedTemplate(e.target.value)}
          style={{ padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', flex: '1', minWidth: '200px' }}
        >
          {Object.entries(getFilteredTemplates()).map(([key, template]) => (
            <option key={key} value={key}>{template.name}</option>
          ))}
        </select>
      </div>
      <InteractiveFlowchart 
        key={selectedTemplate}
        initialNodes={getFilteredTemplates()[selectedTemplate]?.nodes || []}
        initialEdges={getFilteredTemplates()[selectedTemplate]?.edges || []}
      />
    </div>
  );
}