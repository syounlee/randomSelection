# Selection of Winners in a Raffle
We select a specific number of winners in a raffle, where the likelihood of winning is different for each participant.

## Selection Process
For each round, i.e., for each time selecting one winner, we do the following:
- The array of likelihoods of the participants in the round is scaled so that their sum equals 1. [2,3,4,1] => [0.2,0.3,0.4,0.1]
- Create an array that is a cumulative sum array, i.e., [0.2,0.3,0.4,0.1] => [0.2,0.5,0.9,1.0]
- Generate a random number between 0 and 1;
- Find the index where the item in the array is biggest among the items less than or equal to the random number.

## Random Number Generator
We have used [Mersenne Twister](https://en.wikipedia.org/wiki/Mersenne_Twister).

## Selection Function
The 'weightedSelection' returns the array of winner with the inputs (seed, array of likelihoods of participants,number of winners).
