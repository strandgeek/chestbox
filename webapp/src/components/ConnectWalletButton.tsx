import classNames from "classnames";
import { FC } from "react";
import { useWeb3 } from "../hooks/useWeb3";

export const ConnectWalletButton: FC<{
  className?: string,
}> = ({
  className,
}) => {
  const { connectWallet } = useWeb3();
  const buttonClassName = classNames(
    'btn btn-ghost',
    className,
  )
  return (
    <button className={buttonClassName} onClick={() => connectWallet()}>
      <svg className="h-8 w-8" viewBox="0 0 501.333 501.333">
        <g>
          <g>
            <path
              fill="currentColor"
              d="M448,41.6H22.4C9.6,41.6,0,51.2,0,64v373.333c0,12.8,9.6,22.4,22.4,22.4H448c29.867,0,53.333-23.467,53.333-52.267V94.934
			C501.333,65.067,476.8,41.6,448,41.6z M455.467,298.667H274.134V201.6h181.333V298.667z M455.467,156.8h-204.8
			c-12.8,0-22.4,9.6-22.4,22.4v142.933c0,12.8,9.6,22.4,22.4,22.4h204.8v62.933c0,4.267-3.2,7.467-7.467,7.467H44.8V87.466H448
			c4.267,0,7.467,3.2,7.467,7.467V156.8z"
            />
          </g>
        </g>
        <g>
          <g>
            <path
              fill="currentColor"
              d="M328.534,228.267h-7.467c-12.8,0-22.4,9.6-22.4,22.4c0,12.8,9.6,22.4,22.4,22.4h7.467c12.8,0,22.4-9.6,22.4-22.4
			C350.934,237.867,341.334,228.267,328.534,228.267z"
            />
          </g>
        </g>
      </svg>
    </button>
  );
};
