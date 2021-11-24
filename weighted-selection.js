// Selection of Raffle Winnders
const weightedSelection = (seed,weights, numberOfWinners) => {

  var MersenneTwister = require('./mersenne-twister');

  const m = new MersenneTwister(seed);

  const summation = (a, b) => a+b;
  const cumulativeSum = (sum => value => sum += value)(0);

  const adjustWeights = (weights) => {
    sumOfArray = weights.reduce(summation);
    let adjusted_weights = [];

    for (step=0;step<weights.length;step++) {
      adjusted_weights[step] = weights[step]/sumOfArray;
    };
    return adjusted_weights;
  }

  const cumulativeArray = (array) => {
    const newArray = []
    sum = 0;
    for (step=0;step<array.length;step++) {
      sum += array[step];
      newArray[step] = sum;
    }
    return newArray;
  }


  if (Array.isArray(weights) & weights.length >= numberOfWinners) {
    
    adjusted_weights = adjustWeights(weights);
    
    // Define the indices of the array 'weights'
    const originalIndices = [...Array(weights.length).keys()];
    // console.log(adjusted_weights,originalIndices);

    // Define the array of the winners
    let winnerIndices = [];
    // Initialize the weights fot the Round 0
    weightsOfRound = weights;
    indicesOfRound= originalIndices;
    for (round=0;round<numberOfWinners;round++) {
      // Adjust the weights to be summed up to 1.
      adjusted_weights = adjustWeights(weightsOfRound);
      cumulativeWeights = cumulativeArray(adjusted_weights);
      // console.log(numberOfWinners,adjusted_weights,cumulativeWeights);

      // Generate a random number.
      rnd = m.genrand_res53();

      // Find the index
      array = cumulativeWeights.filter(function (element) {return (element <= rnd)});
      winnerRelative = array.length;
      winner = indicesOfRound[array.length];
      // console.log(rnd, array, winner);
      winnerIndices.push(winner);
      weightsOfRound.splice(winnerRelative,1);
      indicesOfRound.splice(winnerRelative,1);

      // console.log(weightsOfRound,indicesOfRound);
      // console.log('-------------------------')
    }


    // console.log("it is an array. And the sum is ",adjusted_weights.reduce(summation), adjusted_weights.length);
    

    return winnerIndices;

  } else if (Array.isArray(weights) & weights.length <= numberOfWinners) {
      return [...Array(weights.length).keys()]
  } else {
    console.log("it is not an array. It is ", typeof weights);

  }

};

module.exports = weightedSelection;