const { count } = require("console");
const fs = require("fs");

const { merge_sort } = require("./sort");
function search_list(list_to_search, list_index, k_frequent_words) {}

function main() {
  try {
    /* get input from cli */
    const cli_args_arr = process.argv[2].split("input=")[1].split(";");
    const output_file = cli_args_arr[2].split("=")[1];
    const k_frequent_words = cli_args_arr[1].split("=")[1];
    const test_case = cli_args_arr[0];

    /* parse file and store words in list */
    let parsed_list = parse_input_file(test_case);
    let parsed_list_3 = parse_input_file(test_case);

    /* recursively sort list */
    let sorted_merged_list = merge_sort(parsed_list_3);
    let reduced_list = reduce_list(
      sorted_merged_list,
      [],
      0,
      0,
      sorted_merged_list.length
    );

    let total_words = 0;
    for (let index = 0; index < reduced_list.length; index++) {
      total_words += reduced_list[index][0];
    }

    console.log("full list: ", parsed_list);
    console.log("full list length: ", parsed_list.length);

    console.log("Merge Sorted : ", sorted_merged_list);
    console.log("Merge Sorted Length : ", sorted_merged_list.length);

    console.log("Reduced List", reduced_list);
    console.log("Reduced List total worlds", total_words);

    /* Test with sorted array by JS */
    // let sorted_js = parsed_list.sort();
    // console.log("Sorted by JS: ", sorted_js);
    // let check = sorted_js.filter((n) => !sorted_merged_list.includes(n));
    // console.log("Difference = : ", check);
    // console.log("Same ? ", check.length == 0, "\n");

    // let total = 0;
    // let array_of_words_sorted = [];
    // for (let i = 0; i < sorted_merged_list.length; i++) {
    //   total++;
    //   if (sorted_merged_list[i] != sorted_merged_list[i + 1]) {
    //     array_of_words_sorted.push([total, sorted_merged_list[i]]);
    //     total = 0;
    //   }
    // }

    // let total_words = 0;
    // for (let index = 0; index < array_of_words_sorted.length; index++) {
    //   total_words += array_of_words_sorted[index][0];
    // }

    // console.log("Array of Words Sorted : ", array_of_words_sorted.sort());
    // // console.log("Array of Words Sorted : ", merge_sort(array_of_words_sorted));
    // console.log("Total Words Sorted : ", total_words);

    /* recursively search for k frequent most frequent words  */
    search_list(parsed_list, 0, k_frequent_words);
  } catch (err) {
    console.error(err);
  }
}


function start_reduce_list(
  sorted_list,
  reduced_list,
  counter,
  total_count_of_words,
  length_list
){

}

function reduce_list(
  sorted_list,
  reduced_list,
  counter,
  total_count_of_words,
  length_list
) {
  let new_total = total_count_of_words + 1;
  let next_word = counter + 1;
  if (counter == length_list) {
    return reduced_list;
  } else {
    if (sorted_list[counter] != sorted_list[next_word]) {
      let new_reduced_list = [
        ...reduced_list,
        [new_total, sorted_list[counter]],
      ];
      console.log(new_reduced_list);
      
      return reduce_list(
        sorted_list,
        new_reduced_list,
        next_word,
        0,
        length_list
      );
    } else {
      return reduce_list(
        sorted_list,
        reduced_list,
        next_word,
        new_total,
        length_list
      );
    }
  }
}

function parse_input_file(file_name) {
  try {
    /* read in file synchronously */
    const data = fs.readFileSync(file_name, "utf8");
    /* split file at all delimeters (.,!\n) and filter out spaces */
    let list_to_store_in = data
      .split(/[,.!?;\n ]/)
      .filter((word) => word != "");
    console.log("input length: ", list_to_store_in.length);
    return list_to_store_in;
  } catch (err) {
    return Error("failed to parse input file");
  }
}

main();
