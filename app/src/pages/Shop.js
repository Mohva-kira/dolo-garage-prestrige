import React, {useState, useEffect} from 'react'
import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import '../styles/shop.css'

// import products from '../assets/data/products'
import ProductList from '../components/UI/ProductList'
import ShopFilters from '../components/UI/ShopFilters'
import PaginationControls from '../components/UI/PaginationControls'
import { useGetProductsQuery } from '../reducers/products'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const Shop = () => {
  const {data, isLoading, isSuccess} = useGetProductsQuery()
  
  const [searchParams, setSearchParams] = useSearchParams();
   console.log('le param', searchParams.get("category")) 
 
  
   const categoryParam =   searchParams.get("category")
  const [ productsData, setProductsData ] = useState()
  const [filters, setFilters] = useState({ priceRange: [0, 100000], category: '' })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)

  const handleFilter = e=> {

    const filterValue = e.target.value
    if(filterValue==='consommable'){
      const filteredProducts = data.data.filter(item => item.attributes.category.data.attributes.name === 'consommable' )
      
      setProductsData(filteredProducts)
      
    }

    if(filterValue==='accessoires'){
      const filteredProducts = data.data.filter(item => item.attributes.category.data.attributes.name === 'accessoires' )
      
      setProductsData(filteredProducts)

    }

    if(filterValue==='Accesoires'){
      const filteredProducts = data.data.filter(item => item.attributes.category.data.attributes.name === 'Accesoires' )
      
      setProductsData(filteredProducts)

    }

    
  
  }

  const handleSearch = e=> {
    const searchTerm = e.target.value 

  const searchedProducts = data.data.filter(item => item.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()))
  setProductsData(searchedProducts)
  }


  useEffect(()=> {


      // initial load
      setProductsData(data?.data)
   
  }, [isSuccess, categoryParam])

  // apply filters & pagination
  useEffect(() => {
    if(!data?.data) return
    let items = [...data.data]

    // category filter
    if(filters.category !== '') {
      items = items.filter(it => it.category?.data?.name === filters.category)
    }

    // price filter (assume numeric price)
   

    setProductsData(items)
    setPage(1)
  }, [filters, data])

  // keep the page within bounds when products or pageSize change
  useEffect(() => {
    const total = Math.max(1, Math.ceil((productsData?.length || 0) / pageSize))
    if (page > total) setPage(total)
  }, [productsData, pageSize])

  return <Helmet title="Shop"> 
      <CommonSection  title={ 'Boutique'} />
      {console.log(productsData)}
      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter__widget">
                 <select onChange={handleFilter}>
                  <option > Filtrer par Category</option>
                  <option value="accessoires" >Accessoires</option>
                  <option value="consommable">Consommable</option>
                  <option value="accessoires">Accessoires</option>
                  <option value="cosmétiques">Cosmétiques</option>

                 </select>
              </div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
            <div className="filter__widget" >
                 <select >
                  <option > Trier par </option>
                  <option value="ascending" >Ascendent</option>
                  <option value="descending">Descendent</option>
                 </select>
              </div>

              <div className="filter__widget mt-2">
                <label className="text-sm text-gray-600 mr-2">Afficher</label>
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className="ml-2">
                  <option value={8}>8 / page</option>
                  <option value={12}>12 / page</option>
                  <option value={16}>16 / page</option>
                  <option value={24}>24 / page</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="search__box">
                <input type="text" placeholder='search.....' onChange={handleSearch} />
                <span><i className="ri-search-line"></i></span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'> 
        <Container>
          <Row>
            <Col lg='3' md='4'>
              {/* derive categories safely from products payload */}
              <ShopFilters categories={data?.data ? Array.from(new Map(data.data.map(it => {
                const cat = it.category?.data
                return cat ? [cat.id, cat] : null
              }).filter(Boolean)).values()) : []} onChange={(f) => setFilters(f)} />
            </Col>
            <Col lg='9' md='8'>
              <Row className="product-list-row">
                { isLoading ? <h4>Loading...</h4> :
                  productsData?.length === 0 ? (<h1 className='text-center fs-4'>No Products found!</h1>) : (
                    // paginated slice passed once to ProductList
                    <ProductList data={productsData?.slice((page-1)*pageSize, page*pageSize)} />
                  )
                }
              </Row>

              {/* Pagination controls */}
              <div className="mt-6 flex items-center justify-center space-x-3">
                {/** compute total pages once for clarity **/}
                <PaginationControls
                  page={page}
                  setPage={setPage}
                  totalItems={productsData?.length || 0}
                  pageSize={pageSize}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
  </Helmet>
}

export default Shop