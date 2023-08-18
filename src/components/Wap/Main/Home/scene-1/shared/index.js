import config from "../../../../../../config/config";

function theSorter(menu) {
  return menu.sort((a, b) => {
    if (config.features.MenuItem_Sorting_HK28) {
      return a.sortingHK28 > b.sortingHK28 ? 1 : -1;
    } else if (config.features.MenuItem_Sorting_WLGHK) {
      return a.sortingWLGHK > b.sortingWLGHK ? 1 : -1;
    } else if (config.features.MenuItem_Sorting_SKY) {
      return a.sortingSKY > b.sortingSKY ? 1 : -1;
    } else if (config.features.MenuItem_Sorting_PB) {
      return a.sortingPB > b.sortingPB ? 1 : -1;
    } else if (config.features.MenuItem_Sorting_GMO) {
      return a.sortingGMO > b.sortingGMO ? 1 : -1;
    } else if (config.features.MenuItem_Sorting_PISO) {
      return a.sortingPISO > b.sortingPISO ? 1 : -1;
    } else if (config.features.MenuItem_Sorting_BUNNY) {
      return a.sortingBUNNY > b.sortingBUNNY ? 1 : -1;
    } else {
      return a.sorting > b.sorting ? 1 : -1;
    }
  });
}

export const shared = {
  theSorter,
};
