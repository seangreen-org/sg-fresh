#!/bin/bash

deno run -A dev.ts &
SERVER_PID=$!

sleep 2

deno test -A e2e/
TEST_EXIT_CODE=$?

kill $SERVER_PID

exit $TEST_EXIT_CODE
