import styles from '../styles/Home.module.css'
import {useState, useEffect} from 'react'
import {
  gql,
  useMutation,
} from "@apollo/client";
import Dante from 'Dante2'

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
      filename
      mimetype 
      encoding
    }
  }
`;

export default function Home(props) {

  const [users, setUsers] = useState([])
  const [rte, setRte] = useState({"blocks":[{"key":"am02s","text":"saaad","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2tob7","text":"","type":"image","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"aspect_ratio":{"width":426,"height":586,"ratio":137.5586854460094},"width":426,"caption":"type a caption (optional)","height":586,"forceUpload":false,"url":"http://localhost:8000/c91ff18e-91dc-4136-a433-394ed7bd58ad","loading_progress":0,"selected":false,"loading":true,"file":null,"direction":"center"}}],"entityMap":{}})

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: data => console.log(data)
  })

  const fetchDataUsers = async () => {
    try {
      const {data} = await props.client.query({
        query: gql`
          query {
            getUsersFromDb {
              firstName
            }
          }`,
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataUsers()
  },[])

  const onChange = (e) => {
    const file = e.target.files[0]
    if(!file) return
    uploadFile({ variables: {file}})
  }

  // const uploadImage = (file, imageBlock) => {
  //   uploadFile({ variables: {file}})
  //   console.log(file)
  // }

  // const widgetConfig = () => {
  //   return [otherBlocks, ImageBlockConfig({
  //     options: {
  //       upload_handler: uploadImage,
  //       image_caption_placeholder: "type a caption"
  //     }
  //   })]
  // }

  return (
    <>
    <div className={styles.container}>
        upload image
         <input type="file" required onChange={onChange} />

      </div>
      <div style={{paddingLeft: '48px', marginTop: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      backgroundColor: 'blue'
    }}>
         dante 2
         <div style={{
           width: '480px',
           backgroundColor: 'white'
         }}>
          <Dante
          // read_only={true}
            // widgets={widgetConfig}
            content={rte || null}
            onChange={editor => { setRte(editor.emitSerializedOutput()) }}
          />
          <button onClick={()=>alert(JSON.stringify(rte))}>print</button>
         <div>
           {JSON.stringify(rte)}
         </div>
         </div>

      </div>
      </>
  )
}
