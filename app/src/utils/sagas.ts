import { eventChannel } from "redux-saga";
import { take, race, delay } from "redux-saga/effects";

export function* waitForCondition(
  condition: () => boolean,
  timeout = 10000,
  checkInterval = 10
): Generator<boolean> {
  console.log("Wait for - starts");
  const waitChannel = eventChannel<string>((emit) => {
    const handle = setInterval(() => {
      if (condition()) {
        emit("success");
      }
    }, checkInterval || 10);
    console.log("Wait for - channel initialized");
    return () => {
      // Finally
      clearInterval(handle);
      console.log("Wait for - channel destrocyed");
    };
  });
  console.log("Wait for - wait for channel");
  const { success, timedout }: any = yield race({
    success: take(waitChannel) as any,
    timedout: delay(timeout) as any,
  }) as any;
  console.log("Wait for result - Success:", success, "- Timeout:", timedout);
  waitChannel.close();
  console.log("Wait for - done");
  return !!success;
}
