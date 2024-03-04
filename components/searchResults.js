import React from "react";
import styles from "@/styles/Home.module.css"; // Ensure this path is correct for your CSS

const SearchResults = ({ results }) => {
  const isTransaction = results[0] && results[0].tx_type !== undefined;

  return (
    <div>
      {results.length > 0 ? (
        <ul className={styles.resultsList}>
          {results.map((result, index) =>
            isTransaction ? (
              // Rendering for transaction data
              <li key={index} className={styles.resultItem}>
                <div>
                  <strong>Hash:</strong> {result.hash}
                </div>
                <div>
                  <strong>Block ID:</strong> {result.block_id}
                </div>
                <div>
                  <strong>Type:</strong> {result.tx_type}
                </div>
                <div>
                  <strong>Return Code:</strong> {result.return_code ?? "N/A"}
                </div>
                <div>
                  <strong>Time:</strong>{" "}
                  {new Date(result.header_time).toLocaleString()}
                </div>
                <div>
                  <strong>Height:</strong> {result.header_height}
                </div>
              </li>
            ) : (
              // Rendering for block data
              <li key={index} className={styles.resultItem}>
                <div>
                  <strong>Height:</strong> {result.header_height}
                </div>
                <div>
                  <strong>Block ID:</strong> {result.block_id}
                </div>
                <div>
                  <strong>Time:</strong>{" "}
                  {new Date(result.header_time).toLocaleString()}
                </div>
                <div>
                  <strong>Proposer Address:</strong>{" "}
                  {result.header_proposer_address}
                </div>
                <div>
                  <strong>Transaction Count:</strong> {result.transaction_count}
                </div>
              </li>
            )
          )}
        </ul>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default SearchResults;
