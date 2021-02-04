import 'components/bytes-table.css'

interface BytesTableProps {
  bytes: string
}

const BytesTable = ({ bytes }: BytesTableProps) => {
  const individualBytes = bytes.split(' ')
  const chunks: string[][] = []

  for (var index = 0; index < individualBytes.length; index += 4) {
    chunks.push(individualBytes.slice(index, index + 4))
  }

  return (
    <table id='bytes-table'>
      <thead id='bytes-table-head'>
        <tr>
          <td scope='col'></td>
          <td scope='col'>#1</td>
          <td scope='col'>#2</td>
          <td scope='col'>#3</td>
          <td scope='col'>#4</td>
        </tr>
      </thead>
      <tbody id='bytes-table-body'>
        {chunks.map(chunk => (
          <tr>
            <td scope='row'>
              {chunks.indexOf(chunk).toString().padStart(8, '0')}
            </td>
            <td>{chunk.length > 0 ? chunk[0] : []}</td>
            <td>{chunk.length > 1 ? chunk[1] : []}</td>
            <td>{chunk.length > 2 ? chunk[2] : []}</td>
            <td>{chunk.length > 3 ? chunk[3] : []}</td>
          </tr>)
        )}
      </tbody>
    </table>
  )
}

export default BytesTable
