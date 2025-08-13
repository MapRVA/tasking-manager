# MapRVA Tasking Manager Fork

Three branches.

## develop

1. MapRVA makes any changes we wish
2. Merge in the latest release commit from hotosm
3. Test deploy (see helm chart repo)

## staging

1. Merge in working commit from develop branch
2. Check https://tasks-staging.maprva.org and make sure everything is working
  - Confirm that database migration is successful

## production

1. Merge in working commit from staging branch
2. This goes live immediately on https://tasks.maprva.org
