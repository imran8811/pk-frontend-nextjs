import { FC } from "react"
import styles from "./factory.module.css"

const Factory : FC = () => {
  return (
    <div className="row">
      <div className="col-12 mb-5">
        <h2 className="text-info">Fabric Store</h2>
        <ul className="mb-3">
          <li><strong>Area = 5000 x 5000 sqft</strong></li>
          <li><strong>Capacity = 1500000 mtr fabric storage</strong></li>
        </ul>
        <div className="row">
          <div className="col-lg-6">
            <img src="/images/denim-jackets-wholesalers.jpg" alt="denim-jackets-wholesalers" />
          </div>
          <div className="col-lg-6">
            <img src="/images/hoodies-manufacturers.png" alt="hoodies-manufacturers" />
          </div>
        </div>
      </div>
      <div className="col-12 mb-5">
        <h2 className="text-info">Fabric Cutting</h2>
        <ul className="mb-3">
          <li><strong>Area = 3000 x 3000 sqft</strong></li>
          <li><strong>3 Cutting tables</strong></li>
          <li><strong>Capacity = 10000 pcs cutting per day</strong></li>
        </ul>
        <div className="row">
          <div className="col-lg-6">
            <img src="/images/jeans-pants-wholesalers.jpg" alt="jeans-pants-wholesalers" />
          </div>
        </div>
      </div>
      <div className="col-12 mb-4">
        <h2 className="text-info">Stitching</h2>
        <ul className="mb-3">
          <li><strong>Area = 10000 x 7000 sqft</strong></li>
          <li><strong>Machines = 450-500</strong></li>
          <li><strong>Workers = 500-600</strong></li>
          <li><strong>Capacity = 50000-60000 garments per month</strong></li>
        </ul>
        <div className="row">
          <div className="col-lg-6 p-2">
            <img src="/images/jeans-manufacturers.jpg" alt="jeans-manufacturers" className="img-fluid" />
          </div>
          <div className="col-lg-6 p-2">
            <img src="/images/denim-shirts-wholesaler.jpg" alt="denim-shirts-wholesaler" className="img-fluid" />
          </div>
        </div>
      </div>
      <div className="col-12 mb-4">
        <h2 className="text-info">Washing</h2>
        <ul className="mb-3">
          <li><strong>Area = 3000 x 1500 sqft</strong></li>
          <li><strong>Tumbles = 25</strong></li>
          <li><strong>Washing machines = 25+</strong></li>
          <li><strong>Rinsers = 10</strong></li>
          <li><strong>Capacity = 10000 garments per day</strong></li>
        </ul>
        <div className="row">
          <div className="col-lg-6">
            <img src="/images/denim-manufacturers.jpg" alt="denim-manufacturers" className="img-fluid" />
          </div>
          <div className="col-lg-6">
            <img src="/images/denim-pants-suppliers-china.jpg" alt="denim-pants-suppliers-china" className="img-fluid" />
          </div>
        </div>
      </div>
      <div className="col-12 mb-4">
        <h2 className="text-info">Quality</h2>
        <ul className="mb-3">
          <li><strong>Area = 5000 x 5000 sqft</strong></li>
          <li><strong>QA = 50+</strong></li>
          <li><strong>Capacity = 10000 pcs per day</strong></li>
        </ul>
        <div className="row">
          <div className="col-lg-6">
            <img src="/images/jeans-quality.jpg" alt="jeans-pants-wholesalers" className="img-fluid" />
          </div>
        </div>
      </div>
      <div className="col-12 mb-4">
          <h2 className="text-info">Packing</h2>
          <ul className="mb-3">
            <li><strong>Area = 6000 x 4000 sqft</strong></li>
            <li><strong>Capacity = 15000 pcs of shipment storage</strong></li>
          </ul>
          <div className="row">
              <div className="col-lg-6">
                <img src="/images/jeans-shirts-manufacturers.jpg" alt="jeans-shirts-manufacturers" className="img-fluid" />
              </div>
              <div className="col-lg-6">
                <img src="/images/jeans-wholesalers.jpg" alt="jeans-wholesalers" className="img-fluid" />
              </div>
          </div>
      </div>
    </div>
  )
}

export default Factory;