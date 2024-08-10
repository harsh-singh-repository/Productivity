const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div
        className="h-[100vh] flex items-center justify-center"
        data-testid="clerk_form"
      >
        {children}
      </div>
  );
};

export default ClerkLayout;
