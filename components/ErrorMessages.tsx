import { FC } from "react";

type Props = {
  isFailed: boolean;
  errorMessage: string;
}

export const ErrorMessages: FC<Props> = ({
  isFailed,
  errorMessage,
}): JSX.Element | null => {
  if (!isFailed) return null;

  return (
    <div>
      <>エラーの詳細</>
      <p>
        {errorMessage}
      </p>
    </div>
  );
}
