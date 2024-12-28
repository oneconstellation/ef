import { IconDirectionSignFilled, IconForms } from '@tabler/icons-react';
import { Outlet, NavLink } from 'react-router-dom';

export function App() {
  return (
    <div className="flex flex-row gap-10">
      <div className="w-full max-w-[18rem]">
        <aside className="sidebar h-full sidebar-fixed-left justify-start">
          <section className="sidebar-title items-center p-4">
            <IconForms />
            <div className="flex flex-col ml-4">
              <span>EF</span>
              <span className="text-xs font-normal text-content2">Effortless forms</span>
            </div>
          </section>
          <section className="sidebar-content h-fit min-h-[20rem] overflow-visible">
            <nav className="menu rounded-md">
              <section className="menu-section px-4">
                <span className="menu-title">Main menu</span>
                <ul className="menu-items">
                  <NavLink to={'/login'}>
                    {({ isActive }) => (
                      <li className={`menu-item ${isActive && 'menu-active'}`}>
                        <IconDirectionSignFilled />
                        <span>Login</span>
                      </li>
                    )}
                  </NavLink>
                  <NavLink to={'/file'}>
                    {({ isActive }) => (
                      <li className={`menu-item ${isActive && 'menu-active'}`}>
                        <IconDirectionSignFilled />
                        <span>File</span>
                      </li>
                    )}
                  </NavLink>
                  <NavLink to={'/range'}>
                    {({ isActive }) => (
                      <li className={`menu-item ${isActive && 'menu-active'}`}>
                        <IconDirectionSignFilled />
                        <span>Range</span>
                      </li>
                    )}
                  </NavLink>
                  <NavLink to={'/text'}>
                    {({ isActive }) => (
                      <li className={`menu-item ${isActive && 'menu-active'}`}>
                        <IconDirectionSignFilled />
                        <span>Text</span>
                      </li>
                    )}
                  </NavLink>
                </ul>
              </section>
            </nav>
          </section>
          <section className="sidebar-footer h-full justify-end bg-gray-2 pt-2">
            <div className="divider my-0"></div>
            <div className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4">
              <label className="whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-4" tabIndex={0}>
                <div className="flex flex-row gap-4 p-4">
                  <div className="flex flex-col">
                    <span>Oneconstellation @ 2024</span>
                  </div>
                </div>
              </label>
            </div>
          </section>
        </aside>
      </div>
      <div className="flex p-4 w-full h-full justify-center">
        <Outlet />
      </div>
    </div>
  );
}
