import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Home.module.css";
import moment from "moment";
import Link from "next/link";
import {
  faPerson,
  faCubes,
  faLink,
  faClock,
  faCube,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeroSection() {
  const [showResult, setShowResult] = useState(true);
  const [height, setHeight] = useState("");
  const [chain, setChain] = useState("");
  const [date, setDate] = useState("");
  const [validators, setValidators] = useState("");
  const [blockResult, setBlockResult] = useState([]);
  const [newBlock, setNewBlock] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [transactionsResult, setTransactionsResult] = useState([]);

  useEffect(() => {
    const lastten = async () => {
      try {
        const response = await axios.get(
          `https://namadaindexer.nodeworld.xyz/blocks`
        );
        setNewBlock(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const lastTrans = async () => {
      try {
        const response = await axios.get(
          `https://namadaindexer.nodeworld.xyz/transactions`
        );
        setTransaction(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const getLatest = async () => {
      try {
        const response = await axios.get(
          `https://namadarpc.nodeworld.xyz/status?`
        );
        setChain(response.data.result.node_info.network);
        setHeight(response.data.result.sync_info.latest_block_height);
        const dates = new Date(
          response.data.result.sync_info.latest_block_time
        );
        const readableDate = dates.toLocaleString();
        setDate(readableDate);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const getTotalValidators = async () => {
      try {
        const response = await axios.get(
          `https://namadarpc.nodeworld.xyz/validators`
        );
        setValidators(response.data.result.total);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    lastTrans();
    lastten();
    getLatest();
    getTotalValidators();
  }, []); // Empty dependency array to run only once on mount

  return (
    <section className={styles.heroSectionContainer}>
      {showResult && (
        <section>
          <section className={styles.latestResults_header}>
            <section>
              <section className={styles.latestResults_box}>
                {/* <section className={styles.svgSection}> */}
                {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 417"
                    preserveAspectRatio="xMidYMid"
                    className={styles.svgEth}
                  >
                    <script
                      xmlns=""
                      id="argent-x-extension"
                      data-extension-id="dlcobpjiigpikoobohmabehhmhfoodbb"
                    />
                    <path
                      fill="#fff"
                      d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
                    />
                    <path
                      fill="#fff"
                      d="M127.962 0L0 212.32l127.962 75.639V154.158z"
                    />
                    <path
                      fill="#fff"
                      d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
                    />
                    <path fill="#fff" d="M127.962 416.905v-104.72L0 236.585z" />
                    <path
                      fill="#eee"
                      d="M127.961 287.958l127.96-75.637-127.96-58.162z"
                    />
                    <path fill="#bbb" d="M0 212.32l127.96 75.638v-133.8z" />
                    <script
                      xmlns=""
                      type="text/javascript"
                      src="chrome-extension://fnnegphlobjdpkhecapkijjdkgcjhkib/inject-script.js"
                      id="one-x-extension"
                      data-extension-id="fnnegphlobjdpkhecapkijjdkgcjhkib"
                    />
                  </svg> */}
                {/* </section> */}
                <section className={styles.svgSection}>
                  <FontAwesomeIcon icon={faCubes} className={styles.svgIcons} />
                </section>
                <section className={styles.hero_box}>
                  <p>
                    <b>LATEST BLOCK:</b>
                  </p>
                  <p className={styles.heroValues}>#{Number(height)}</p>
                </section>
              </section>
              <span className={styles.divider}></span>
              <section className={styles.latestResults_box}>
                <section className={styles.svgSection}>
                  <FontAwesomeIcon
                    icon={faPerson}
                    className={styles.svgIcons}
                  />
                </section>
                <section className={styles.hero_box}>
                  <p>
                    <b>TOTAL VALIDATORS:</b>
                  </p>
                  <p className={styles.heroValues}>#{validators}</p>
                </section>
              </section>
            </section>
            <section>
              <section className={styles.latestResults_box}>
                <section className={styles.svgSection}>
                  <FontAwesomeIcon icon={faLink} className={styles.svgIcons} />
                </section>
                <section className={styles.hero_box}>
                  <p>
                    <b>CHAIN ID:</b>
                  </p>
                  <p className={styles.heroValues}>{chain}</p>
                </section>
              </section>
              <span className={styles.divider}></span>
              <section className={styles.latestResults_box}>
                <section className={styles.svgSection}>
                  <FontAwesomeIcon icon={faClock} className={styles.svgIcons} />
                </section>
                <section className={styles.hero_box}>
                  <p>
                    <b>LASTEST BLOCK TIME:</b>
                  </p>
                  <p className={styles.heroValues}>{date}</p>
                </section>
              </section>
            </section>
            {/* <section>
              <section className={styles.hero_averageValue}>
                <p>Average Transaction Value</p>
                <Image src={Chart} alt="Chart" className={styles.chart} />
              </section>
            </section> */}
          </section>
          {/* <BocksTrans /> */}
          <section className={styles.latestResults_body}>
            <section>
              <section className={styles.latestResults_body_title}>
                Latest Blocks
              </section>
              <table className={styles.latestResults_body_table}>
                <tbody>
                  <tr
                    className={`${styles.latestResults_body_tr} ${
                      0 == 0 - 1 && styles.lastTd
                    }`}
                    key={1400}
                  >
                    <td className={styles.tdIcon}></td>
                    <td className={styles.tdBlock}>
                      <section>
                        <b> Block Height: </b>{" "}
                      </section>
                    </td>
                    <td className={styles.tdBlock}>
                      <section>
                        <b>Proposer Address:</b>{" "}
                      </section>
                      <section></section>
                    </td>
                    <td className={styles.tdValue}>
                      <b>No. of Txs:</b>
                    </td>
                  </tr>
                  {newBlock.map((block) => {
                    return (
                      <tr
                        className={`${styles.latestResults_body_tr} ${
                          blockResult.indexOf(block) ==
                            blockResult.length - 1 && styles.lastTd
                        }`}
                        key={block.header_height}
                      >
                        <td className={styles.tdIcon}>
                          <FontAwesomeIcon icon={faCube} />
                        </td>
                        <td className={styles.tdBlock}>
                          <section className={styles.blueText}>
                            <Link
                              href={`/click?num=${block.header_height}`}
                              className={styles.linkStyle}
                            >
                              #{block.header_height}
                            </Link>
                          </section>
                          <section>
                            {moment(block.header_time).fromNow()}
                          </section>
                        </td>
                        <td className={styles.tdBlock}>
                          <section>
                            <span className={styles.blueText}>
                              {block.header_proposer_address.slice(0, 6)}...
                              {block.header_proposer_address.slice(36)}
                            </span>
                          </section>
                          <section>
                            <span className={styles.blueText}></span>
                          </section>
                        </td>
                        <td className={styles.tdValue}>
                          {block.transaction_count}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
            <section>
              <section className={styles.latestResults_body_title}>
                Latest Transactions
              </section>
              <table className={styles.latestResults_body_table}>
                <tbody>
                  <tr
                    className={`${styles.latestResults_body_tr} ${
                      0 == 0 - 1 && styles.lastTd
                    }`}
                    key={1501}
                  >
                    <td className={styles.tdContract}></td>
                    <td className={styles.tdBlock}>
                      <section>
                        <b>Transaction:</b>
                      </section>
                    </td>
                    <td className={styles.tdBlock}>
                      <section>
                        <b>Height:</b>
                      </section>
                    </td>
                    <td className={styles.tdValue}>
                      <b>Status:</b>
                    </td>
                  </tr>
                  {transaction.map((txn) => {
                    return (
                      <tr
                        className={`${styles.latestResults_body_tr} ${
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
                            {txn.hash?.slice(0, 14)}...
                          </section>
                          <section>{moment(txn.header_time).fromNow()}</section>
                        </td>
                        <td className={styles.tdBlock}>
                          <section>
                            <span className={styles.blueText}></span>
                          </section>
                          <section>
                            <Link
                              href={`/click?num=${txn.header_height}`}
                              className={styles.linkStyle}
                            >
                              #{txn.header_height}
                            </Link>

                            <span className={styles.blueText}>
                              {txn.totalTransactions}
                            </span>
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
        </section>
      )}
    </section>
  );
}
