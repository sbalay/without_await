import React, { useState, useCallback } from 'react';
import { Button, Text, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

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
};

test("it works", async () => {
  const { findByText, getByRole, getByText } = render(<Example />);
  getByText(/Value is 0/i);
  const button = getByRole("button");

  fireEvent.press(button);
  await findByText(/Value is 1/i);

  //If I comment out these lines and no error message will be logged
  fireEvent.press(button);
  await findByText(/Value is 2/i);

  // If I uncomment these lines and two error messages will be logged
  // fireEvent.press(button);
  // await findByText(/Value is 3/i);
});
