import type { CTAAction } from "~/contexts";
import { Dispatch } from "react";
export function onClickHandler(
  isShowingEmailInput: boolean,
  dispatch: Dispatch<CTAAction>
) {
  if (isShowingEmailInput) {
    dispatch({ type: "SOLDOUT_SET_SHOULD_SUBMIT", shouldSubmit: true });
  } else {
    dispatch({ type: "SOLDOUT_TOGGLE_EMAIL_INPUT" });
  }
}
