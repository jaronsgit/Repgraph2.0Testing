export const janDMRS = {
  id: "20001001",
  source: "wsj00a",
  input:
    "Pierre Vinken, 61 years old, will join the board as a nonexecutive director Nov. 29.",
  tokens: [
    { index: 0, form: "pierre", lemma: "Pierre", carg: "Pierre" },
    { index: 1, form: "Vinken,", lemma: "Vinken", carg: "Vinken" },
    { index: 2, form: "61", lemma: "61", carg: "61" },
    { index: 3, form: "years", lemma: "year" },
    { index: 4, form: "old,", lemma: "old" },
    { index: 5, form: "will", lemma: "will" },
    { index: 6, form: "join", lemma: "join" },
    { index: 7, form: "the", lemma: "the" },
    { index: 8, form: "board", lemma: "board" },
    { index: 9, form: "as", lemma: "as" },
    { index: 10, form: "a", lemma: "a" },
    { index: 11, form: "nonexecutive", lemma: "nonexecutive" },
    { index: 12, form: "director", lemma: "director" },
    { index: 13, form: "nov.", lemma: "Nov", carg: "Nov" },
    { index: 14, form: "29.", lemma: "29", carg: "29" }
  ],
  nodes: [
    { id: 0, label: "proper_q", anchors: [{ from: 0, end: 0 }] },
    { id: 1, label: "named", anchors: [{ from: 0, end: 0 }] },
    { id: 2, label: "named", anchors: [{ from: 1, end: 1 }] },
    { id: 3, label: "compound", anchors: [{ from: 0, end: 1 }] },
    { id: 4, label: "card", anchors: [{ from: 2, end: 2 }] },
    { id: 5, label: "_year_n_1", anchors: [{ from: 3, end: 3 }] },
    { id: 6, label: "measure", anchors: [{ from: 2, end: 3 }] },
    { id: 7, label: "udef_q", anchors: [{ from: 2, end: 3 }] },
    { id: 8, label: "_old_a_1", anchors: [{ from: 4, end: 4 }] },
    { id: 9, label: "proper_q", anchors: [{ from: 0, end: 4 }] },
    { id: 10, label: "_join_v_1", anchors: [{ from: 6, end: 6 }] },
    { id: 11, label: "_the_q", anchors: [{ from: 7, end: 7 }] },
    { id: 12, label: "_board_n_of", anchors: [{ from: 8, end: 8 }] },
    { id: 13, label: "_as_p", anchors: [{ from: 9, end: 9 }] },
    { id: 14, label: "_a_q", anchors: [{ from: 10, end: 10 }] },
    {
      id: 15,
      label: "_nonexecutive_u_unknown",
      anchors: [{ from: 11, end: 11 }]
    },
    { id: 16, label: "_director_n_of", anchors: [{ from: 12, end: 12 }] },
    { id: 17, label: "mofy", anchors: [{ from: 13, end: 13 }] },
    { id: 18, label: "def_explicit_q", anchors: [{ from: 13, end: 13 }] },
    { id: 19, label: "of_p", anchors: [{ from: 13, end: 13 }] },
    { id: 20, label: "def_implicit_q", anchors: [{ from: 13, end: 13 }] },
    { id: 21, label: "dofm", anchors: [{ from: 14, end: 14 }] },
    { id: 22, label: "loc_nonsp", anchors: [{ from: 13, end: 14 }] }
  ],
  edges: [
    { source: 9, target: 2, label: "RSTR", "post-label": "H" },
    { source: 3, target: 2, label: "ARG1", "post-label": "EQ" },
    { source: 3, target: 1, label: "ARG2", "post-label": "NEQ" },
    { source: 0, target: 1, label: "RSTR", "post-label": "H" },
    { source: 6, target: 8, label: "ARG1", "post-label": "EQ" },
    { source: 6, target: 5, label: "ARG2", "post-label": "NEQ" },
    { source: 7, target: 5, label: "RSTR", "post-label": "H" },
    { source: 4, target: 5, label: "ARG1", "post-label": "EQ" },
    { source: 8, target: 2, label: "ARG1", "post-label": "EQ" },
    { source: 10, target: 2, label: "ARG1", "post-label": "NEQ" },
    { source: 10, target: 12, label: "ARG2", "post-label": "NEQ" },
    { source: 11, target: 12, label: "RSTR", "post-label": "H" },
    { source: 13, target: 10, label: "ARG1", "post-label": "EQ" },
    { source: 13, target: 16, label: "ARG2", "post-label": "NEQ" },
    { source: 14, target: 16, label: "RSTR", "post-label": "H" },
    { source: 15, target: 16, label: "ARG1", "post-label": "EQ" },
    { source: 22, target: 10, label: "ARG1", "post-label": "EQ" },
    { source: 22, target: 21, label: "ARG2", "post-label": "NEQ" },
    { source: 18, target: 21, label: "RSTR", "post-label": "H" },
    { source: 19, target: 21, label: "ARG1", "post-label": "EQ" },
    { source: 19, target: 17, label: "ARG2", "post-label": "NEQ" },
    { source: 20, target: 17, label: "RSTR", "post-label": "H" }
  ],
  tops: [10]
};

export const layoutGraph = (sentence) => {
  let graph = sentence;

  //Determine span lengths of each node
  const graphNodeSpanLengths = graph.nodes
    .map((node) => node.anchors[0])
    .map((span) => span.end - span.from);
  //Determine unique span lengths of all the node spans
  let uniqueSpanLengths = [];
  const map = new Map();
  for (const item of graphNodeSpanLengths) {
    if (!map.has(item)) {
      map.set(item, true); // set any value to Map
      uniqueSpanLengths.push(item);
    }
  }
  uniqueSpanLengths.sort((a, b) => a - b); //sort unique spans ascending

  //Sort the nodes into each level based on their spans
  let nodesInLevels = [];
  for (const level of uniqueSpanLengths) {
    let currentLevel = [];

    for (
      let spanIndex = 0;
      spanIndex < graphNodeSpanLengths.length;
      spanIndex++
    ) {
      if (graphNodeSpanLengths[spanIndex] === level) {
        currentLevel.push(graph.nodes[spanIndex]);
      }
    }

    nodesInLevels.push(currentLevel);
  }
  //Find the nodes in each level with the same span and group them together
  //Find the unique spans in each level
  let uniqueSpansInLevels = [];
  for (let level of nodesInLevels) {
    let uniqueSpans = []; //Stores the "stringified" objects
    const spanMap = new Map();
    for (const node of level) {
      if (!spanMap.has(JSON.stringify(node.anchors))) {
        spanMap.set(JSON.stringify(node.anchors), true); // set any value to Map
        uniqueSpans.push(JSON.stringify(node.anchors));
      }
    }
    uniqueSpansInLevels.push(uniqueSpans);
    //console.log(uniqueSpans);
  }

  //Iterate through the unique spans in each level and group the same ones together
  for (let level = 0; level < nodesInLevels.length; level++) {
    let newLevelOfGroups = [];
    for (let uniqueSpan of uniqueSpansInLevels[level]) {
      //find the nodes in the level that have the same span and group them together
      let nodesWithCurrentSpan = nodesInLevels[level].filter(
        (node) => JSON.stringify(node.anchors) === uniqueSpan
      );
      newLevelOfGroups.push(nodesWithCurrentSpan);
    }
    nodesInLevels[level] = newLevelOfGroups;
  }

  //Determine the actual number of levels needed
  let height = 0;
  let previousLevelHeights = [0];
  for (let level of nodesInLevels) {
    let maxLevelHeight = 0;
    for (let item of level) {
      maxLevelHeight = Math.max(maxLevelHeight, item.length);
    }
    previousLevelHeights.push(maxLevelHeight);
    height += maxLevelHeight;
  }
  //console.log({height});
  //console.log({nodesInLevels});
  //console.log({previousLevelHeights});

  //Sort the nodes into the final levels
  let nodesInFinalLevels = [];
  for (let index = 0; index < height; index++) {
    nodesInFinalLevels.push([]);
  }
  for (let level = 0; level < nodesInLevels.length; level++) {
    //console.log(nodesInLevels[level]);
    for (let group of nodesInLevels[level]) {
      //console.log({group});
      for (
        let nodeGroupIndex = 0;
        nodeGroupIndex < group.length;
        nodeGroupIndex++
      ) {
        //console.log(group[nodeGroupIndex]);
        let finalLevel =
          previousLevelHeights
            .slice(0, level + 1)
            .reduce((accumulator, currentValue) => accumulator + currentValue) +
          nodeGroupIndex;
        nodesInFinalLevels[finalLevel].push(group[nodeGroupIndex]);
      }
    }
  }
  //console.log({ nodesInFinalLevels });

  //Map the nodes in each level to the correct format

  const totalGraphHeight = height * 50 + (height - 1) * 70; //number of levels times the height of each node and the spaces between them

  for (let level = 0; level < nodesInFinalLevels.length; level++) {
    nodesInFinalLevels[level] = nodesInFinalLevels[level].map((node) => ({
      id: node.id,
      x: node.anchors[0].from * 110,
      y: totalGraphHeight - level * (totalGraphHeight / height),
      label: node.label,
      type: "node",
      nodeLevel: level,
      anchors: node.anchors[0],
      group: "node"
    }));
  }

  const tokens = graph.tokens.map((token) => ({
    index: token.index,
    x: token.index * 110,
    y: totalGraphHeight + 100,
    label: token.form,
    type: "token",
    group: "token"
  }));

  //this.setState({graphData: nodesInFinalLevels.flat().concat(tokens)});

  const finalGraphNodes = nodesInFinalLevels
    .flat()
    .concat(tokens)
    .map((node) => ({
      id: node.id,
      x: node.x,
      y: node.y,
      label: node.label,
      title: node.label + " tooltip text",
      group: node.group,
      anchors: node.anchors,
      fixed: true,
      nodeLevel: node.nodeLevel
    }));

  const finalGraphEdges = graph.edges.map((edge, index) => {
    /*const fromID =
          finalGraphNodes[
              finalGraphNodes.findIndex((node) => node.id === edge.source)
              ].id;
      const toID =
          finalGraphNodes[
              finalGraphNodes.findIndex((node) => node.id === edge.target)
              ].id;*/

    const sourceNodeIndex = finalGraphNodes.findIndex(
      (node) => node.id === edge.source
    );
    const targetNodeIndex = finalGraphNodes.findIndex(
      (node) => node.id === edge.target
    );

    return {
      id: index,
      source: finalGraphNodes[sourceNodeIndex],
      target: finalGraphNodes[targetNodeIndex],
      label: edge.label
    };
    /*source: testGraphNodes[edge.source],
                  target: testGraphNodes[edge.target],*/
  });

  const finalGraph = {
    nodes: finalGraphNodes,
    links: finalGraphEdges
  };

  //console.log(finalGraph);

  return { finalGraph, totalGraphHeight };
};
