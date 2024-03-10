import Image from 'next/image'
import styles from "./about.module.css"

export default function AboutComp(){
  return (
    <div className="col-12 page-about">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 mb-5">
          <h1 className="page-title">Jeans Manufacturing Company</h1><br />
          <div className="row">
            <div className="col-6 mb-3">
              <Image src="/images/img3.jpg" width={300} height={200} alt="about img" className="img-thumbnail" />
            </div>
            <div className="col-6">
              <Image src="/images/img2.jpg" width={300} height={200} alt="about img" className="img-thumbnail" />
            </div>
          </div>
          <p>PK Apparel is a well-reputed name engaged in the Manufacturing and Supplying of a wide range of Jeans
            Products. Our assorted variety of Jeans Products includes Denim Jeans, Denim Jackets, Jeans Pants and Jeans
            Shirts. The company is an ISO Certified Company, which talks about the company&apos;s credibility. Moreover,
            the company is also a Member of the Clothing Manufacturers Association of Pakistan. Today, PK Apparel is
            considered to be one of the finest quality denim makers.</p>
          <h2>Team</h2>
          <p>We have a team backed by skilled, experienced, responsible and well educated Merchandisers and Managers to
            look after our company&apos;s merchandise and quality control. A lot of effort goes into planning and
            selecting material of the highest quality that suits the style of the garments. Take for example the choice of
            selecting the best possible fabric for a Denim Pant. Even though a number of light-weight textiles, and
            fabrics are available making an exclusive choice for that perfect apparel is the challenge. We make sure that
            the material we use is organic such that it qualifies as a trademark offering of Fine Fair garments.</p>
          <div className="row mb-5 mt-5">
            <div className="col-6">
              <Image src="/images/img4.jpg" width={200} height={200} alt="about img" className="img-thumbnail" />
            </div>
            <div className="col-6">
              <Image src="/images/img5.jpg" width={200} height={200} alt="about img" className="img-thumbnail" />
            </div>
          </div>
          <h3>Quality</h3>
          <p>PK Apparel puts quality as the first priority which is why every manufactured product is inspected before
            being dispatched for distribution. Intricate details like the stitching of buttons and size of button holes
            are given proper inspection. Rivets, metal buttons and the snaps are checked for durability and their ability
            to withstand with rust. If we find any problem while inspection we send the defaulted piece immediately back
            for re-sewing. After resolving the issue, the jeans are again passed through the inspection phase. This
            process is repeated until the issue is resolved.</p>
        </div>
        <div className="col-lg-2"></div>
      </div>
    </div>
  )
}