const weightedSelection = require('./weighted-selection');
const MersenneTwister = require('./mersenne-twister');


// Generate a collection of participants whose likelihood are generated by random function 'genrand_int31'
seed = 10;
const numberOfParticipants = 1000;
const m = new MersenneTwister(seed);
likelihoods = []
for (step=0;step<numberOfParticipants;step++){
  likelihoods[step] = m.genrand_int31();
}

// Now call the 'wei
winners = weightedSelection(1,likelihoods,30);
console.log(winners);