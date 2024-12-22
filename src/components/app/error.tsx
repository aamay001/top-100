import { LuTriangleAlert } from "react-icons/lu";
import { H1, Paragraph, YStack } from "tamagui"

const Error = () => {
  return (
    <YStack justifyContent="center" alignItems="center" padding="$10">
      <H1>An Error Happened!</H1>
      <br />
      <LuTriangleAlert size={50} />
      <Paragraph size="$7" textAlign="center">
        <br />
        Oh no! Something went seriously wrong!
        <br />
        <br />
        You can try refreshing the page to see if that help!
        <br />
        Please reach out for help!
      </Paragraph>
    </YStack>
  )
}

export default Error;