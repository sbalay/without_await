import React, {useState, useCallback} from 'react';
import {Button, Text, View} from 'react-native';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {act} from 'react-test-renderer';

function Example() {
  const [value, setValue] = useState(0);

  const asyncIncrement = useCallback(() => {
    setTimeout(() => setValue((v) => v + 1), 0);
  }, []);

  return (
    <View>
      <Text>Value is {value}</Text>
      <Button title="Increment" onPress={asyncIncrement} />
    </View>
  );
}

function waitForInternal(expectation, options) {
  var _options$timeout, _options$interval;

  const timeout =
    (_options$timeout =
      options === null || options === void 0 ? void 0 : options.timeout) !==
      null && _options$timeout !== void 0
      ? _options$timeout
      : 4500;
  const interval =
    (_options$interval =
      options === null || options === void 0 ? void 0 : options.interval) !==
      null && _options$interval !== void 0
      ? _options$interval
      : 50;
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    const rejectOrRerun = (error) => {
      if (Date.now() - startTime >= timeout) {
        reject(error);
        return;
      }

      setTimeout(runExpectation, interval);
    };

    function runExpectation() {
      try {
        const result = expectation();
        resolve(result);
      } catch (error) {
        rejectOrRerun(error);
      }
    }

    setTimeout(runExpectation, 0);
  });
}

function checkReactVersionAtLeast(major, minor) {
  if (React.version === undefined) return false;
  const [actualMajor, actualMinor] = React.version.split('.').map(Number);
  return actualMajor > major || (actualMajor === major && actualMinor >= minor);
}

async function myWaitFor(expectation, options) {
  if (!checkReactVersionAtLeast(16, 9)) {
    return waitForInternal(expectation, options);
  }

  let result; //$FlowFixMe: `act` has incorrect flow typing

  await (0, act)(async () => {
    result = await waitForInternal(expectation, options);
  }); //$FlowFixMe: either we have result or `waitFor` threw error

  return result;
}

test('it works', async () => {
  const {getByRole, getByText} = render(<Example />);
  getByText(/Value is 0/i);
  const button = getByRole('button');

  fireEvent.press(button);
  await waitFor(() => getByText(/Value is 1/i));

  //If I comment out these lines and no error message will be logged
  fireEvent.press(button);
  await waitFor(() => getByText(/Value is 2/i));

  // If I uncomment these lines and two error messages will be logged
  // fireEvent.press(button);
  // await findByText(/Value is 3/i);
});
