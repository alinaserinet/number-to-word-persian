const range1 = {
    1: 'یک',
    2: 'دو',
    3: 'سه',
    4: 'چهار',
    5: 'پنج',
    6: 'شش',
    7: 'هفت',
    8: 'هشت',
    9: 'نه',
    10: 'ده',
    11: 'یازده',
    12: 'دوازده',
    13: 'سیزده',
    14: 'چهارده',
    15: 'پانزده',
    16: 'شانزده',
    17: 'هفده',
    18: 'هجده',
    19: 'نوزده'
}

const range10 = {
    1: 'ده',
    2: 'بیست',
    3: 'سی',
    4: 'چهل',
    5: 'پنجاه',
    6: 'شصت',
    7: 'هفتاد',
    8: 'هشتاد',
    9: 'نود',
}

const range100 = {
    1: 'صد',
    2: 'دویست',
    3: 'سیصد',
    4: 'چهارصد',
    5: 'پانصد',
    6: 'ششصد',
    7: 'هفتصد',
    8: 'هشتصد',
    9: 'نهصد'
}

const numbersSuffix = {
    1: 'هزار',
    2: 'میلیون',
    3: 'میلیارد',
    4: 'تریلیون',
    5: 'بیلیارد'
}

function wordsWithSuffix(numbers, suffixIndex){
    let findWords = numbers.map(
        (num, index) => {
            //check range10 in number
            if(numbers [1] == 1){
                switch(index){
                    case 0:
                        return range1[parseInt(num) + 10];
                    case 2:
                        return range100[parseInt(num)];
                }
            }
            else{
                switch(index){
                    case 0:
                        return range1[parseInt(num)];
                    case 1:
                        return range10[parseInt(num)];
                    case 2:
                        return range100[parseInt(num)];
                }
            }
        }
    );
    //remove numbers by value 0
    let filterWords = findWords.filter((num) => {
        num != undefined;
        return num;
    });
    let suffix;
    // check range
    if(suffixIndex != 0 && filterWords.length > 0){
        suffix = " " + numbersSuffix[suffixIndex] + ' و ';
    }
    else{
        suffix = "";
    }
    return filterWords.reverse().join(' و ') + suffix;
}

function classifyNumbers(numbers){
    // find count of array create from numbers Array
    let max = ((numbers.length) - (numbers.length%3))/3;
    max += numbers.length%3 == 0 ? 0 : 1;
    const classifyArray = [];
    for(let i = 0; i < max; i++){
        //cut numbers array and cut it to several array -> array-length = 3
        classifyArray.push(numbers.slice((i*3), (i*3) + 3));
    }
    return classifyArray;
}

function combineNumbers(numbers){
    //get numbers by range group million / bilion , ...
    const numbersArray = classifyNumbers(numbers);
    const combineWords = [];
    for(let i= 0; i<numbersArray.length; i++){
        combineWords.push(wordsWithSuffix(numbersArray[i], i));
    }
    return combineWords.reverse();
}

// merge all words & create final word for export
function render(numbers){
    // get numbers array from combine
    let numWords = combineNumbers(numbers);
    let mergeWords = '';
    numWords.forEach(
        (word) => {
            mergeWords += word;
        }
    );
    let lastChar = mergeWords[mergeWords.length-2];
    let finalWord = lastChar == 'و' ? mergeWords.slice(0, (mergeWords.length-2)) : mergeWords;
    finalWord = finalWord == "" ?  'صفر' : finalWord;
    // find Negative numbers --> Condition
    if(numbers[numbers.length-1] == '-'){
        finalWord = 'منفی ' + finalWord;
    }
    return finalWord;
}
module.exports = function(number){
    let numberToArray = number.toString().split('').reverse();
    return render(numberToArray);
}
