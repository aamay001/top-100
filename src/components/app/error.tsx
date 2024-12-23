import { LuTriangleAlert } from "react-icons/lu";
import { H1, Paragraph, YStack } from "tamagui"

interface ErrorProps {
  error?: Error,
}

const Error: React.FC<ErrorProps> = ({
  error,
}) => {
  return (
    <YStack justifyContent="center" alignItems="center" padding="$10">
      <H1>An Error Happened!</H1>
      <br />
      <LuTriangleAlert size={50} />
      <Paragraph size="$7" textAlign="center">
        <br />
        Oh no! Something unexpected happened!
        <br />
        <br />
        You can try refreshing the page to see if that helps!
        <br />
        Please reach out for help!
        <br />
        <br />
      </Paragraph>
      {error && <details>
        <summary>More Information</summary>
          <pre>
            {error.message}
          </pre>
      </details>}
    </YStack>
  )
}

export default Error;