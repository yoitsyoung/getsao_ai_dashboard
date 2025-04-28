import React, { useEffect, useRef } from 'react';

interface Series {
  name: string;
  data: number[];
  color: string;
}

interface LineGraphProps {
  series: Series[];
  labels: string[];
}

export const LineGraph: React.FC<LineGraphProps> = ({ series, labels }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const padding = 40;
    const graphWidth = canvas.width - (padding * 2);
    const graphHeight = canvas.height - (padding * 2);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Find the highest value to scale the graph
    const maxValue = Math.max(
      ...series.flatMap(s => s.data),
      0
    );
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Y-axis
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    
    // X-axis
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw grid lines
    const gridCount = 5;
    ctx.beginPath();
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 1; i <= gridCount; i++) {
      const y = padding + ((graphHeight / gridCount) * i);
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
    }
    
    // Vertical grid lines
    const step = graphWidth / (labels.length - 1);
    for (let i = 0; i < labels.length; i++) {
      const x = padding + (step * i);
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
    }
    ctx.stroke();
    
    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    
    // X-axis labels (dates)
    for (let i = 0; i < labels.length; i += Math.ceil(labels.length / 6)) {
      const x = padding + (step * i);
      const date = new Date(labels[i]);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
      ctx.fillText(formattedDate, x, canvas.height - (padding / 2));
    }
    
    // Y-axis labels (values)
    ctx.textAlign = 'right';
    for (let i = 0; i <= gridCount; i++) {
      const y = canvas.height - padding - ((graphHeight / gridCount) * i);
      const value = Math.round((maxValue / gridCount) * i);
      ctx.fillText(value.toString(), padding - 10, y + 4);
    }
    
    // Draw legend
    const legendX = padding;
    const legendY = padding - 15;
    ctx.textAlign = 'left';
    
    let currentX = legendX;
    series.forEach(s => {
      // Legend color indicator
      ctx.fillStyle = s.color;
      ctx.fillRect(currentX, legendY, 10, 10);
      
      // Legend text
      ctx.fillStyle = '#374151';
      ctx.fillText(s.name, currentX + 15, legendY + 8);
      
      currentX += ctx.measureText(s.name).width + 40;
    });
    
    // Draw lines for each series
    series.forEach(s => {
      ctx.beginPath();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 2;
      
      // Draw lines
      s.data.forEach((value, index) => {
        const x = padding + (step * index);
        const y = canvas.height - padding - ((value / maxValue) * graphHeight);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
      
      // Draw points
      s.data.forEach((value, index) => {
        const x = padding + (step * index);
        const y = canvas.height - padding - ((value / maxValue) * graphHeight);
        
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2;
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.stroke();
      });
    });
    
  }, [series, labels]);
  
  return (
    <div className="w-full h-full relative">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
    </div>
  );
};