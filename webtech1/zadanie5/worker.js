(function(s) {

    function findPrimeNumbers(start, limit) {
        var isPrime,i,j;
        var element = Math.round(limit / 100);

        for (i = start; i < limit; i++) {

            isPrime = true;
            if (i % element == 0) {
                s.postMessage({
                    progress: true,
                    prime: i
                });
            }

            for (j = 2; j < i; j++) {

                if (i % j === 0) {
                    isPrime = false;
                }
            }

            if (isPrime) {
              //console.log(i);
                s.postMessage({
                    prime: i
                });
            }
        }
        s.postMessage({
            progress: true,
            prime: i
        });
    }
    s.addEventListener('message', function(e) {
        findPrimeNumbers(e.data.start, e.data.limit);
    });

}(self));
