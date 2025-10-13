import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";

const WalletConnectButton = () => {
  const { isConnected, address } = useAccount();
  const { connectors, connect, status: connectStatus, error } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    const short = `${address?.slice(0, 6)}...${address?.slice(-4)}`;
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{short}</span>
        <Button size="sm" variant="outline" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {connectors.map((c) => (
        <Button
          key={c.uid}
          size="sm"
          variant="default"
          onClick={() => connect({ connector: c })}
          disabled={!c.ready || connectStatus === "pending"}
        >
          {c.name}
        </Button>
      ))}
      {error ? (
        <span className="text-xs text-destructive">{error.message}</span>
      ) : null}
    </div>
  );
};

export default WalletConnectButton;


