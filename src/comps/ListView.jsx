import { Button, ButtonGroup, Checkbox, FloatingLabel, Kbd, Label, ListGroup, Modal, Pagination, Table, Tabs, TextInput } from "flowbite-react";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { HiMiniShare, HiArrowsUpDown, HiMiniAdjustmentsVertical, HiMiniPlusCircle, HiCheck } from "react-icons/hi2"


export default function ListView({
  data, currentPage, totalPages, onPageChange, pagination,
  renderFilters, onFilterApply, renderCreator, onItemSelect,
  presntationFields: presentationFields, renderItemModal
}) {
  const [openShareModal, setOpenShareModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openTransModal, setOpenTransModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <div className="relative grid grid-rows-12 h-full w-full overflow-hidden p-8">
        <div className="flex justify-between items-center px-2">
          <div className="w-64 flex justify-start py-2">
            <ButtonGroup>
              <Button color="gray" className="w-full" onClick={() => {
                setOpenCreateModal(true);
              }}>
                <HiMiniPlusCircle className="w-5 h-5" />
              </Button>
              <Button color="gray" className="w-full" onClick={() => {
              }}>
                <HiCheck className="w-5 h-5" />
              </Button>
            </ButtonGroup>
          </div>

          <div className="w-96 flex flex-col py-2">
            {
              pagination && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              )
            }
          </div>

          <div className="w-64 flex justify-end">
            <ButtonGroup>
              <Button color="gray" className="w-full" onClick={() => {
                setOpenFilterModal(true);
              }}>
                <HiMiniAdjustmentsVertical className="w-5 h-5" />
              </Button>
              <Button color="gray" className="w-full" onClick={() => {
                setOpenShareModal(true);
              }}>
                <HiMiniShare className="w-5 h-5" />
              </Button>
              <Button color="gray" className="w-full" onClick={() => {
                setOpenTransModal(true);
              }}>
                <HiArrowsUpDown className="w-5 h-5" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="overflow-scroll row-span-11">
          <Table className="relative" striped hoverable>
            <Table.Head className="sticky">
              {
                presentationFields
                  ? presentationFields.map((field, index) => (
                    <Table.HeadCell key={index}>
                      {field.label}
                    </Table.HeadCell>
                  ))
                  : Object.keys(data[0]).map((key, index) => (
                    <Table.HeadCell key={index}>
                      {key}
                    </Table.HeadCell>
                  ))
              }
            </Table.Head>

            <Table.Body className="divide-y">
              {
                data.map((item, index) => (
                  <Table.Row key={index} onClick={() => {
                    onItemSelect && onItemSelect(item);
                    setSelectedItem(item);
                    setOpenItemModal(true);
                  }}>
                    {
                      presentationFields
                        ? presentationFields.map((field, index) => (
                          <Table.Cell key={index}>
                            {(() => {
                              const value = item[field.key];
                              if (field.maxLength && value.length > field.maxLength) {
                                return value.substr(0, field.maxLength) + "...";
                              }
                              return value;
                            })()}
                          </Table.Cell>
                        ))
                        : Object.keys(item).map((key, index) => (
                          <Table.Cell key={index}>
                            {item[key]}
                          </Table.Cell>
                        ))
                    }
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
        </div>

      </div>

      <Modal show={openShareModal} onClose={() => setOpenShareModal(false)}>
        <Modal.Header>
          Share this view (<Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>S</Kbd>)
        </Modal.Header>

        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenShareModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={openFilterModal} onClose={() => setOpenFilterModal(false)}>
        <Modal.Header>
          Filter (<Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>F</Kbd>)
        </Modal.Header>

        <Modal.Body>
          {renderFilters?.()}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => {
            setOpenFilterModal(false);
            onFilterApply?.();
          }}>Apply</Button>
          <Button color="gray" onClick={() => setOpenFilterModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={openTransModal} onClose={() => setOpenTransModal(false)}>
        <Modal.Header>
          Transfer data (<Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>T</Kbd>)
        </Modal.Header>

        <Modal.Body>
          <Tabs variant="pills">
            <Tabs.Item title="Export">
              <ListGroup>
                <ListGroup.Item>
                  <span className="h-10 flex items-center">
                    <span>As JSON</span>
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="h-10 flex items-center">
                    <span>As CSV</span>
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="h-10 flex items-center">
                    <span>As Excel</span>
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Tabs.Item>
            <Tabs.Item title="Import">
              <ListGroup>
                <ListGroup.Item>
                  <span className="h-10 flex items-center">
                    <span>From JSON</span>
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="h-10 flex items-center">
                    <span>From CSV</span>
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="h-10 flex items-center">
                    <span>From Excel</span>
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Tabs.Item>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenTransModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <Modal.Header>
          Create (<Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>N</Kbd>)
        </Modal.Header>

        <Modal.Body>
          {renderCreator?.()}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenCreateModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={openItemModal} onClose={() => setOpenItemModal(false)}>
        <Modal.Header>
          Item
        </Modal.Header>

        <Modal.Body>
          {renderItemModal && selectedItem && renderItemModal(selectedItem)}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenItemModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}