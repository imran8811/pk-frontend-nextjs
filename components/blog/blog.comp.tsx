import { FC } from "react";
import Link from "next/link";
import styles from '../blog/blog.module.css'
import cls from 'classnames';

const Blog: FC = () => {
  return (
    <div className="row mb-5">
      <div className={cls(styles.singlePost, "col-lg-6 mb-5 border-bottom border-end border-warning")}>
        <h2>
          <Link href="men/jeans-pants/bulk-jeans" title="bulk-jeans">Bulk Jeans</Link>
        </h2>
        <div className="row">
          <div className="col-lg-4 mb-3">
            <img width="500" height="500" src="/images/posts/bulk-jeans.jpg" alt="bulk-jeans" />
          </div>
          <div className="col-lg-8">
            <p>Denim is an aberration that has opened a whole new window for textile industries. It is the invention that was needed in this world. This era of Denim has increased the versatility of the fashion industry and has given them</p>
            <p className="text-end"><Link className={styles.readMore} href="men/jeans-pants/bulk-jeans"> Read More</Link></p>
          </div>
        </div>
      </div>
      <div className={cls(styles.singlePost, "col-lg-6 mb-5 border-bottom border-warning")}>
        <h2>
          <Link href="men/jeans-pants/denim-manufacturers" title="denim-manufacturers">Denim Manufacturers</Link>
        </h2>
        <div className="row">
          <div className="col-lg-4 mb-3">
            <img width="500" height="500" src="/images/posts/denim-manufacturers.jpg" alt="denim-manufacturers" />
          </div>
          <div className="col-lg-8">
            <p>Denim is an eclectic art that has no end. Considering the types of denim fabric and their advantages, it is not peculiar for denim to pave its way into the textile industry and outshine all other types of fabrics.</p>
            <p><Link className={styles.readMore} href="men/jeans-pants/denim-manufacturers"> Read More</Link></p>
          </div>
        </div>
      </div>
      <div className={cls(styles.singlePost, "col-lg-6 mb-5 border-bottom border-end border-warning")}>
        <h2>
          <Link href="men/jeans-pants/kevlar-jeans-manufacturers" title="kevlar-jeans-manufacturers">Biker Kevlar Jeans</Link>
        </h2>
        <div className="row">
          <div className="col-lg-4 mb-3">
            <img width="500" height="500" src="/images/posts/kevlar-jeans-manufacturers.jfif" alt="kevlar-jeans-manufacturers" />
          </div>
          <div className="col-lg-8">
            <p>Jeans with aramid protection will never run out of fashion. They will remain a signature style for the bikers. It is impossible to venture out with regular jeans once you are introduced to the best quality that Kevlar Jeans manufacturers are providing.</p>
            <p><Link className={styles.readMore} href="men/jeans-pants/kevlar-jeans-manufacturers"> Read More</Link></p>
          </div>
        </div>
      </div>
      <div className={cls(styles.singlePost, "col-lg-6 mb-5 border-bottom border-warning")}>
        <h2>
          <Link href="men/jeans-pants/wholsale-jeans-bulk" title="wholsale-jeans-bulk">wholsale-jeans-bulk</Link>
        </h2>
        <div className="row">
          <div className="col-lg-4 mb-3">
            <img width="500" height="500" src="/images/men/jeans-pants/wholsale-jeans-bulk.jpg" alt="wholsale-jeans-bulk" />
          </div>
          <div className="col-lg-8">
            <p>Denim is the type of fabric that is unique yet extremely versatile at the same time. In previous years and even in today&apos;s fashion, denim is being used in various clothing items such as jeans, dresses and t shirts. Since denim seems to be the latest fashion trend, wholesale denim shirts suppliers seem to be </p>
            <p><Link href="men/jeans-pants/wholsale-jeans-bulk"> Read More</Link></p>
          </div>
        </div>
      </div>
      <div className={cls(styles.singlePost, "col-lg-6 mb-5 border-bottom border-end border-warning")}>
        <h2>
          <Link href="men/jeans-pants/denim-shirts-manufacturers" title="Denim shirts manufacturers">Denim shirts manufacturers always in business</Link>
        </h2>
        <div className="row">
          <div className="col-lg-4 mb-3">
            <img width="640" height="335" src="/images/posts/denim-shirts-manufacturers.jpg" alt="denim-shirts-manufacturers" />
          </div>
          <div className="col-lg-8">
            <p>In recent few years, denim shirts manufacturers have come in the limelight because of this newly discovered denim style. Denim is a kind of fabric that is versatile and durable and this very reason makes its demand endless all over the world. Talking about the good ole 1800s, this was the time when denim became </p>
            <p><Link className={styles.readMore} href="men/jeans-pants/denim-shirts-manufacturers"> Read More</Link>
            </p>
          </div>
        </div>
      </div>
      <div className={cls(styles.singlePost, "col-lg-6 mb-5 border-bottom border-warning")}>
        <h2>
          <Link href="men/jeans-pants/wholesale-women-jeans" title="Wholesale women jeans">Wholesale women jeans perks and benefits</Link>
        </h2>
        <div className="row">
          <div className="col-lg-4 mb-3">
            <img width="854" height="871" src="/images/posts/wholesale-women-jeans.jpg" alt="wholesale-women-jeans" />
          </div>
          <div className="col-lg-8">
            <p>Year after year, trends change and women fashion experiences drastic changes. From long dresses to short skirts and tank tops, there have been quite lot variations; some additions and some fashion buried forever. If there is one thing that has always been in the latest trends and the number one choice of women from around</p>
            <p><Link href="men/jeans-pants/wholesale-women-jeans"> Read More</Link></p>
          </div>
        </div>
      </div>
      <div className={cls(styles.singlePost, "col-lg-6 mb-5 border-bottom border-end border-warning")}>
        <h2>
          <Link href="men/jeans-pants/jeans-manufacturing-cost" title="Jeans manufacturing cost">Jeans manufacturing cost</Link>
        </h2>
        <div className="row">
          <div className="col-lg-4 mb-3">
            <img width="500" height="334" src="/images/posts/jeans-pants-wholesalers.jpg" alt="jeans-pants-wholesalers" />
          </div>
          <div className="col-lg-8">
            <p>When it comes to calculating the cost of jeans, there are a few elements to consider. Fabric, wash, thread, trims, embellishments, and units are all variables that play a part. Fabric and wash account for a major portion of the cost of these jeans. Since the fabric cost has been discussed, let us shift our focus to the wash.</p>
            <p><Link href="men/jeans-pants/jeans-manufacturing-cost"> Read More</Link></p>
          </div>
        </div>
      </div>
      <div className={cls(styles.singlePost, "col-lg-6 mb-5 border-bottom border-warning")}>
        <h2>
          <Link href="men/jeans-pants/jeans-pants-manufacturers" title="jeans pants manufacturers?">Looking for jeans pants manufacturers?</Link>
        </h2>
        <div className="row">
          <div className="col-lg-4 mb-3">
            <img width="440" height="220" src="/images/posts/jeans-pants-manufacturers.jpg" alt="jeans-pants-manufacturers" />
          </div>
          <div className="col-lg-8">
            <p>If you are looking for a top quality jeans manufacturer in town, then head over to PK Apparel. PK Apparel is the number one jeans and pants manufacturing company providing stylish and fashionable jeans. If there is a name for perfection and customer satisfaction, then undoubtedly it is PK Apparel.</p>
            <p><Link href="men/jeans-pants/jeans-pants-manufacturers"> Read More</Link></p>
          </div>
        </div>
      </div>
  </div>
  )
}

export default Blog;