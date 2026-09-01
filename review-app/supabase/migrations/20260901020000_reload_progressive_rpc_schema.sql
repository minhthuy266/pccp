-- Projects that applied the six-level migration before its explicit NOTIFY
-- need a new migration version so deployment tooling triggers a cache reload.
notify pgrst, 'reload schema';
