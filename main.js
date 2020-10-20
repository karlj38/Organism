// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Returns a specimen object
const pAequorFactory = (id, arr) => {
  return {
    specimenNum: id,
    dna: arr,
    mutate() {
      // changes a random dna base to a different value
      const i = Math.floor(Math.random() * 15);
      const currentBase = this.dna[i];
      do {
        newBase = returnRandBase();
      } while (newBase === currentBase);
      this.dna[i] = newBase;
      return this.dna;
    },
    compareDNA(pAequor) {
      // returns % dna in common
      let score = 0;
      let i;
      const l = this.dna.length;
      const currentBase = this.dna;
      const compareBase = pAequor.dna;
      let percent;
      for (i = 0; i < l; i++) {
        if (currentBase[i] === compareBase[i]) {
          score++;
        }
      }
      percent = Math.round((score / l) * 100 * 10) / 10; // to one decimal place
      // console.log(
      //   `Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} share ${percent}% DNA in common.`
      // );
      return [this.specimenNum, pAequor.specimenNum, percent];
    },
    willLikelySurvive() {
      //returns survival rate %
      let score = 0;
      let percent;
      const l = this.dna.length;
      this.dna.forEach((base) => {
        if (base === "C" || base === "G") {
          score++;
        }
      });
      percent = Math.round((score / l) * 100 * 10) / 10; // to one decimal place
      return percent >= 60 ? true : false;
    },
    compBase(base) {
      // return complementary dna base
      switch (base) {
        case "A":
          return "T";
        case "T":
          return "A";
        case "C":
          return "G";
        case "G":
          return "C";
      }
    },
    complementaryStrand() {
      //return complementary dna strand
      let compStrand = [];
      compStrand = this.dna.map((x) => this.compBase(x));
      return compStrand;
    },
  };
};

const collection = (n) => {
  // returns an array of specimen objects
  let arr = [];
  let i;
  let specimen;
  for (i = 1; i <= n; i++) {
    do {
      specimen = pAequorFactory(i, mockUpStrand());
    } while (!specimen.willLikelySurvive());
    arr.push(specimen);
  }
  return arr;
};

const mostRelated = (arr) => {
  // returns most closesly related DNA pair from an array
  let related = []; // nested array of records (id,id,%)
  let maxList = []; // array of %
  let max; // max %
  let found; // related array index that matches max
  arr.forEach((x) =>
    arr.forEach((y) => {
      if (x !== y) {
        related.push(x.compareDNA(y));
      }
    })
  );
  related.forEach((item) => {
    maxList.push(item[2]);
  });
  max = Math.max(...maxList);
  found = related.find((element) => element[2] === max);
  return `The two most closely related specimens are, #${found[0]} and #${found[1]}: ${found[2]}%.`;
};

const set = collection(5);
// console.log(set);

console.log(mostRelated(set));
