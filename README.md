## Features support:
1. Campaign list view to display all campaigns
2. Campaign detail view to display metrics
    * Navigate to detail view by clicking campaign card in the list view
3. Refetch campaign data in detail view every 5 seconds
4. Error handling

## Issues
1. In details view, not really sure the business requirements for following properties:
      * Current Number (iteration/pull #)
      * Most Recent Impressions
      * Most Recent Clicks
      * Most Recent CTR
      * Most Recent Users
2. If the request failed in the detail view, the fetch interval is still running

## Steps to run the app
required node version: >= 20
> `npm install`

> `npm start`

## Running Unit Tests
> `npm test`
