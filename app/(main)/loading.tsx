import styles from "../loading.module.css"

const Loading = () => {
    return (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] backdrop-blur">
            <div className={styles.loadingWrapper}>
                <div className={styles.childLoading}>
                    <div>
                        <div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading