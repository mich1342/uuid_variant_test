#!/bin/sh
echo 'start initiate_db.js'
node initiate_db.js
echo 'end initiate_db.js'

echo 'start populate_db.js'
node populate_db.js
echo 'end populate_db.js'

echo 'start fill_short_uuid.js'
node fill_short_uuid.js
echo 'end fill_short_uuid.js'

echo 'start evaluate_short_uuid.js'
node evaluate_short_uuid.js
echo 'end evaluate_short_uuid.js'

echo 'start view_db.js'
node view_db.js
echo 'end view_db.js'

echo 'start view_summary.js'
node view_summary.js
echo 'end view_summary.js'
