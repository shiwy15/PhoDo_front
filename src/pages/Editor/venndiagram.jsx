import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as venn from 'venn.js';
// import 'venn.js/venn.css';

// npm install venn.js d3

const VennDiagram = () => {
  const vennContainer = useRef(null);

  useEffect(() => {
    const sets = [
      { sets: ['A'], size: 50, label: 'Animal' },
      { sets: ['B'], size: 50, label: 'Natural' },
      { sets: ['C'], size: 50, label: 'Machine' },
      { sets: ['D'], size: 50, label: 'D' },
      { sets: ['E'], size: 50, label: 'E' },
      { sets: ['A', 'B'], size: 45, label: '' },
      { sets: ['A', 'C'], size: 45, label: '' },
      { sets: ['B', 'D'], size: 45, lBbel: '' },
      { sets: ['C', 'E'], size: 45, label: '' },
      { sets: ['D', 'E'], size: 45, label: '' },
      { sets: ['A', 'B', 'C'], size: 5, label: '' },
      { sets: ['B', 'C', 'D'], size: 5, label: '' },
      { sets: ['B', 'C', 'E'], size: 5, label: '' },
      { sets: ['B', 'D', 'E'], size: 5, label: '' },
      { sets: ['C', 'D', 'E'], size: 5, label: '' },
      { sets: ['A', 'B', 'C', 'D', 'E'], size: 3, label: '' },
    ];

    const chart = venn.VennDiagram()
      .width(900)
      .height(700)
      .fontSize(30);

    d3.select(vennContainer.current)
      .datum(sets)
      .call(chart);
  }, []);

  return (
    <div>
      <div ref={vennContainer}></div>
    </div>
  );
};

export default VennDiagram;