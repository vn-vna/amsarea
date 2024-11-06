import ListView from "../comps/ListView";

const TEST_USERDATA = [
  ...Array.from({ length: 1000 }, (_, i) => ({
    id: i + 2,
    name: `User ${i}`,
    email: `user${i}@email.com`
  })),
]

export default function AdminUserManager() {
  return (
    <div className="flex items-start justify-center h-full w-full">
      <ListView
        data={[...TEST_USERDATA]}
        currentPage={1}
        totalPages={100}
        onPageChange={() => { }}
        pagination={true}
        renderFilters={() => { }}
        onFilterApply={() => { }}
        renderCreator={() => { }}
        onItemSelect={() => { }}
        presntationFields={[
          {
            key: "name",
            label: "Name"
          },
          {
            key: "email",
            label: "Email"
          }
        ]}
        renderItemModal={() => { }}
      />
    </div>
  )
}