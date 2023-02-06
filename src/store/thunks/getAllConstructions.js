import { Constructions, PageState } from "store/reducers";
import { PAGE_STATE } from "store/reducers/pageState";

function getAllConstructions() {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/MinhPhu0304/data-dump/main/at-roadworks.json"
      );

      const data = JSON.parse(await res.text()); // raw github user content is being an ass so this works around that
      dispatch(
        Constructions.actions.UPDATE_CONSTRUCTIONS({ constructions: data })
      );
      dispatch(
        PageState.actions.UPDATE_PAGE_STATE({ newPageState: PAGE_STATE.LOADED })
      );
    } catch (e) {
      dispatch(
        PageState.actions.UPDATE_PAGE_STATE({ newPageState: PAGE_STATE.FAILED })
      );
    }
  };
}

export { getAllConstructions };
