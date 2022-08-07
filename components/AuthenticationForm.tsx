import { FC, FormEvent, Dispatch, SetStateAction } from "react";

type Props =  {
  onSubmit: (event: FormEvent) => void;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  btnText: string;
}

export const AuthenticationForm: FC<Props> = ({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  btnText,
}: Props) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>

          <input
            id="email"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>

          <input
            id="password"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        <button type="submit">{btnText}</button>
      </form>

    </div>
  );
}