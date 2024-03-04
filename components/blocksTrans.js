import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import styles from "@/styles/Home.module.css";
import { faCube, faFileContract } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Addresss from "./fulladd1";
import Link from "next/link";

export default function BocksTrans(props) {
  const [blockResult, setBlockResult] = useState([]);
  const [transactionsResult, setTransactionsResult] = useState([]);
  const [newBlock, setNewBlock] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [logo, setLogo] = useState(faCube);
  useEffect(() => {
    setLoading(true); // Start loading
    const lastten = async () => {
      try {
        const response = await axios.get(
          `https://namadaindexer.nodeworld.xyz/getblocks?page=${String(
            props.data
          )}`
        );
        setNewBlock(response.data.blocks);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
      setLoading(false);
    };

    const lastTrans = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `https://namadaindexer.nodeworld.xyz/gettransactions?page=${String(
            props.data
          )}`
        );
        setTransaction(response.data.transactions);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
      setLoading(false);
    };
    // setLogo(props.logos);
    if (props.type == "transactions") {
      lastTrans();
    } else {
      lastten();
    }
  }, [props.data]); // Empty dependency array to run only once on mount
  if (loading) {
    return <div className={styles.spinner}></div>; // Show spinner when loading
  }

  if (props.type == "blocks") {
    return (
      <section className={styles.latestResults_body_trans}>
        <section>
          <section className={styles.latestResults_body_title_trans}>
            {props.param} Details:
          </section>
          <table className={styles.latestResults_body_table_trans}>
            <tbody>
              <tr
                className={`${styles.latestResults_body_tr_trans} ${
                  0 == 0 - 1 && styles.lastTd
                }`}
                key={1300}
              >
                <td className={styles.tdBlock}>
                  <section>
                    <b>Block Height</b>
                  </section>
                </td>
                <td className={styles.tdBlock}>
                  <section>
                    <b>Age</b>
                  </section>
                </td>
                <td className={styles.tdTxns}>
                  <section>
                    <b>Proposer Address</b>{" "}
                  </section>
                </td>
                <td className={styles.tdBlock}>
                  <section>
                    <b>No. of Txs</b>
                  </section>
                </td>
              </tr>
              {newBlock.map((block) => {
                return (
                  <tr
                    className={`${styles.latestResults_body_tr_trans} ${
                      blockResult.indexOf(block) == blockResult.length - 1 &&
                      styles.lastTd
                    }`}
                    key={block.header_height}
                  >
                    <td className={styles.tdBlock}>
                      <section className={styles.blueText}>
                        <Link
                          href={`/click?num=${block.header_height}`}
                          className={styles.linkStyle}
                        >
                          #{block.header_height}
                        </Link>
                      </section>
                    </td>
                    <td className={styles.tdBlock}>
                      <section className={styles.blueText}>
                        {moment(block.header_time).fromNow()}
                      </section>
                    </td>
                    <td className={styles.tdTxns}>
                      <section>
                        <span className={styles.blueText}>
                          <Addresss
                            fullAddress={block.header_proposer_address}
                          />
                        </span>
                      </section>
                      <section>
                        <span className={styles.blueText}></span>
                      </section>
                    </td>
                    <td className={styles.tdBlock}>
                      <section className={styles.tdValue}>
                        {block.transaction_count}
                      </section>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </section>
    );
  } else {
    return (
      <section className={styles.latestResults_body_trans}>
        <section>
          <section className={styles.latestResults_body_title_trans}>
            {props.param} Details:
          </section>
          <table className={styles.latestResults_body_table_trans}>
            <tbody>
              <tr
                className={`${styles.latestResults_body_tr_trans} ${
                  0 == 0 - 1 && styles.lastTd
                }`}
                key={1029}
              >
                <td className={styles.tdContract}></td>
                <td className={styles.tdBlock}>
                  <b>Transaction Hash</b>
                </td>
                <td className={styles.tdBlock}>
                  <b>Block Height</b>
                  {/* <section> */}
                  {/* <span className={styles.blueText}>
                          #{txn.header_height}
                        </span> */}
                  {/* <span className={styles.blueText}>
                          {txn.totalTransactions}
                        </span> */}
                  {/* </section> */}
                </td>
                <td className={styles.tdBlock}>
                  <section>
                    <b>Time</b>
                  </section>
                </td>
                <td className={styles.tdValue}>
                  <b>status</b>
                </td>
              </tr>
              {transaction.map((txn) => {
                return (
                  <tr
                    className={`${styles.latestResults_body_tr_trans} ${
                      transactionsResult.indexOf(txn) ==
                        transactionsResult.length - 1 && styles.lastTd
                    }`}
                    key={txn.hash}
                  >
                    <td className={styles.tdContract}>
                      <FontAwesomeIcon
                        icon={faFileContract}
                        className={styles.tdContract}
                      />
                    </td>
                    <td className={styles.tdBlock}>
                      <section className={styles.blueText}>
                        <Addresss fullAddress={txn.hash} />
                      </section>
                    </td>
                    <td className={styles.tdBlock}>
                      <section className={styles.blueText}>
                        <Link
                          href={`/click?num=${txn.header_height}`}
                          className={styles.linkStyle}
                        >
                          #{txn.header_height}
                        </Link>
                      </section>
                    </td>
                    <td className={styles.tdBlock}>
                      <section className={styles.blueText}>
                        {new Date(txn.header_time).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </section>
                    </td>
                    <td className={styles.tdValue}>
                      {txn.return_code === 0 || txn.return_code === null
                        ? "Success"
                        : "Failed"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </section>
    );
  }
}
{
  /* </section>
  );
} */
}
