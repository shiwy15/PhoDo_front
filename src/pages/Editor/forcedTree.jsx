import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ForcedDirectedTree = () => {
  const treeContainer = useRef(null);

  useEffect(() => {
    const data = {
      nodes: [
        { id: 'A', label: 'Animal' },
        { id: 'B', label: 'Natural' },
        { id: 'C', label: 'Machine' },
        { id: 'D', label: 'D' },
        { id: 'E', label: 'E' },
        { id: 'F', label: 'F' },
        { id: 'G', label: 'G' },
        { id: 'H', label: 'H' },
        { id: 'I', label: 'I' },
        { id: 'J', label: 'J' },
        { id: 'K', label: 'K' },
        { id: 'L', label: 'L' },
        { id: 'M', label: 'M' },
        { id: 'N', label: 'N' },
        { id: 'O', label: 'O' },
      ],
      links: [
        { source: 'A', target: 'B' },
        { source: 'A', target: 'C' },
        { source: 'A', target: 'D' },
        { source: 'B', target: 'E' },
        { source: 'B', target: 'F' },
        { source: 'C', target: 'G' },
        { source: 'D', target: 'H' },
        { source: 'D', target: 'I' },
        { source: 'E', target: 'J' },
        { source: 'F', target: 'K' },
        { source: 'G', target: 'L' },
        { source: 'G', target: 'M' },
        { source: 'I', target: 'N' },
        { source: 'J', target: 'O' },
      ],
    };

    const width = 1200;
    const height = 700;

    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        'link',
        d3.forceLink(data.links).id((d) => d.id)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const svg = d3
      .select(treeContainer.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const link = svg
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .style('stroke', '#ccc')
      .style('stroke-width', 1);

    const node = svg
      .selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('r', 20)
      .style('fill', 'steelblue')
      .call(
        d3
          .drag()
          .on('start', dragStarted)
          .on('drag', dragged)
          .on('end', dragEnded)
      );

    node.append('title').text((d) => d.label);

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    });

    function dragStarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, []);

  return <div ref={treeContainer}></div>;
};

export default ForcedDirectedTree;
