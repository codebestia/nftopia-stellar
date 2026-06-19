import { gql } from "@apollo/client";
import { NFT_FIELDS_FRAGMENT, TRANSFER_EVENT_FIELDS_FRAGMENT } from "../fragments";

export const GATEWAY_HEALTH_QUERY = gql`
  query GatewayHealth {
    __typename
  }
`;

export const GET_NFTS_QUERY = gql`
  query GetNfts($page: Int, $limit: Int, $collectionId: ID, $ownerId: ID) {
    nfts(
      page: $page
      limit: $limit
      collectionId: $collectionId
      ownerId: $ownerId
    ) {
      ...NftFields
    }
  }
  ${NFT_FIELDS_FRAGMENT}
`;

export const GET_NFT_BY_ID_QUERY = gql`
  query GetNftById($id: ID!) {
    nft(id: $id) {
      ...NftFields
      creator {
        id
        username
        walletAddress
      }
      owner {
        id
        username
        walletAddress
      }
      collection {
        id
        name
        symbol
      }
    }
  }
  ${NFT_FIELDS_FRAGMENT}
`;

/**
 * Query to fetch NFT transfer history with pagination
 * Used for the provenance/ownership history section on NFT detail page
 */
export const GET_NFT_TRANSFER_HISTORY_QUERY = gql`
  query GetNftTransferHistory(
    $nftId: ID!
    $page: Int
    $limit: Int
  ) {
    nftTransferHistory(
      nftId: $nftId
      page: $page
      limit: $limit
    ) {
      edges {
        node {
          ...TransferEventFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
  ${TRANSFER_EVENT_FIELDS_FRAGMENT}
`;

/**
 * Query to fetch NFT transfer history with cursor-based pagination
 * Alternative for infinite scroll implementation
 */
export const GET_NFT_TRANSFER_HISTORY_CURSOR_QUERY = gql`
  query GetNftTransferHistoryCursor(
    $nftId: ID!
    $first: Int
    $after: String
  ) {
    nftTransferHistoryCursor(
      nftId: $nftId
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...TransferEventFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
  ${TRANSFER_EVENT_FIELDS_FRAGMENT}
`;

/**
 * Query to fetch a specific transfer event by ID
 */
export const GET_NFT_TRANSFER_EVENT_QUERY = gql`
  query GetNftTransferEvent($id: ID!) {
    nftTransferEvent(id: $id) {
      ...TransferEventFields
    }
  }
  ${TRANSFER_EVENT_FIELDS_FRAGMENT}
`;