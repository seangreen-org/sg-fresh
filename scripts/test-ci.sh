#!/bin/bash
set -e

# Start the dev server in the background, redirecting output
deno run -A dev.ts > /tmp/fresh-server.log 2>&1 &
SERVER_PID=$!

# Give the server time to start
sleep 2

# Check if server is still running
if ! kill -0 $SERVER_PID 2>/dev/null; then
  echo "Server failed to start. Check /tmp/fresh-server.log for details"
  cat /tmp/fresh-server.log
  exit 1
fi

# Run tests with resource and ops sanitization disabled since we have an external server
deno test -A --no-check --unsanitize-resources --unsanitize-ops e2e/
TEST_EXIT_CODE=$?

# Kill the server and wait for it to fully terminate
kill $SERVER_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true

exit $TEST_EXIT_CODE
