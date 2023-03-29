import {useState} from 'react'
import {CgSmileMouthOpen} from 'react-icons/cg'
import './index.css'

const EachProduct = props => {
  const {ItemDetails} = props
  const {images, title, stock, price, discountPercentage, brand} = ItemDetails
  const [displayProductDetails, setDisplayDetails] = useState(false)
  const [displayModal, setDisplayModal] = useState(false)
  const [modalData, setModalData] = useState('')
  const onClickProduct = async () => {
    await setDisplayDetails(!displayProductDetails)
    await setDisplayModal(!displayModal)
    if (!displayModal) {
      setModalData(ItemDetails)
    } else {
      setModalData('')
    }
  }

  return (
    <tr>
      <td className="table-items">
        <img src={images[0]} alt="images" className="product-images" />
      </td>
      <td className="table-items">
        {title}
        <br />
        {displayProductDetails && <p>{brand} ( brand )</p>}
      </td>

      <td className="table-items">
        <CgSmileMouthOpen className="smile-icon" /> {'  '}
        In stock
        <br />
        {displayProductDetails && <p>{stock}</p>}
      </td>
      <td className="table-items">
        RS. {price}/-
        <br />
        {displayProductDetails && (
          <div className="display">
            <p className="discount-price">
              RS. {Math.round(price * (discountPercentage / 100) + price)}
            </p>
            <p>({discountPercentage})</p>
          </div>
        )}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onClickProduct}
          data-toggle="modal"
          data-target="#exampleModal"
        >
          View
        </button>
        {displayModal && modalData !== '' && (
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <div>
                    <h5
                      className="modal-title thanking-customers-section-modal-title"
                      id="exampleModalLabel"
                    >
                      {modalData.title}
                    </h5>
                    <h6
                      className="modal-title thanking-customers-section-modal-title"
                      id="exampleModalLabel"
                    >
                      RS : {modalData.price}/-
                    </h6>
                  </div>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={onClickProduct}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <img src={modalData.images[0]} className="w-100" alt="" />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={onClickProduct}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {console.log(modalData, 'k')}
      </td>
    </tr>
  )
}
export default EachProduct