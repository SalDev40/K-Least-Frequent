const fs = require("fs");

const { merge_sort, start_row_bubble_sort } = require("./sort");
const { start_reducing_list } = require("./reduce");

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

    /* recursively sort inpit list */
    let sorted_merged_list = merge_sort(parsed_list_3);

    console.log("full list: ", parsed_list);
    console.log("full list length: ", parsed_list.length);

    console.log("Merge Sorted : ", sorted_merged_list);
    console.log("Merge Sorted Length : ", sorted_merged_list.length);

    /* Test with sorted array by JS */
    let sorted_js = parsed_list.sort();
    console.log("Sorted by JS: ", sorted_js);
    console.log("Sorted by JS length: ", sorted_js.length);
    let check = sorted_js.filter((n) => !sorted_merged_list.includes(n));
    console.log("Difference = : ", check);
    console.log("Same ? ", check.length == 0, "\n");

    /* reduce sorted list to get frequencies of each word */
    let reduced_list = start_reducing_list(sorted_merged_list);

    let total_words_reduced = 0;
    for (let index = 0; index < reduced_list.length; index++) {
      total_words_reduced += reduced_list[index][0];
    }

    console.log("Reduced List", reduced_list);

    /* sort reduced list from lowest frequency to highest  */
    let sorted_reduced_list = start_row_bubble_sort(
      reduced_list,
      0,
      1,
      reduced_list.length
    );
    console.log("Sorted Reduced List: ", sorted_reduced_list);
    console.log("Reduced List total worlds", total_words_reduced);

    let total = 0;
    let array_of_words_reduced = [];
    for (let i = 0; i < sorted_merged_list.length; i++) {
      total++;
      if (sorted_merged_list[i] != sorted_merged_list[i + 1]) {
        array_of_words_reduced.push([total, sorted_merged_list[i]]);
        total = 0;
      }
    }
    let total_words = 0;
    for (let index = 0; index < array_of_words_reduced.length; index++) {
      total_words += array_of_words_reduced[index][0];
    }

    console.log("Sorted JS reduced list : ", array_of_words_reduced.sort());
    console.log("Total Words JS reduce list : ", total_words);

    /* get K least frequent words  from sorted reduce list */
    let k_least_frequent = sorted_reduced_list.slice(0, k_frequent_words);
    console.log(
      "K =",
      k_frequent_words,
      " => least frequent words: ",
      k_least_frequent
    );

    /* write to output file */
    fs.writeFileSync(output_file, k_least_frequent); 
  } catch (err) {
    console.error(err);
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
