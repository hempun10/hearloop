import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="17c1eb08-0438-4ada-91b0-4996e47f266c",
    name="Toggle Public Roadmap Visibility",
    tc_id="TC-36",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"header_roadmap_link": "false", "roadmap_link_back": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/login?next=/acme/dashboard/settings/access', instruction_id='c0e63e3c-0355-475f-8635-f34c1df644b1'):
        variable_value_0 = var('{{global.base_url}}/login?next=/acme/dashboard/settings/access')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for the queued plan to run', instruction_id='e6f072ce-dde2-42e8-9cc8-b2b6d29695e8'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='0dc5382e-29cb-4931-972b-ff35768b974b'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='6a3a2621-b77e-421c-9c0b-b2f0ef786b0f'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Click "Sign in"', instruction_id='46219fdb-f50e-424b-86d1-3f6cad506ea9'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Turning off Public roadmap switch', instruction_id='fb12b44a-100c-4bf5-9506-3598f0dd49ca'):
        _loc_2 = page.locator("internal:role=switch[name=\"Public roadmap\"i]")
        
        await _loc_2.click()
    
    async with testmu.step('Clicking Save changes', instruction_id='691e9935-0b71-4adf-97c7-6da1585c5328'):
        _loc_3 = page.locator("internal:role=button[name=\"Save changes\"i]")
        
        await _loc_3.click()
    
    async with testmu.step('Navigating to http://localhost:3000/acme', instruction_id='f78e66d5-2520-4d29-8be1-ae359cca8024'):
        await page.goto("http://localhost:3000/acme")
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the Acme board page to load', instruction_id='f149a10a-c5ba-403a-a432-a0bfc3562b16'):
            await page.wait_for_timeout(1000)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Acme' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step("whether the 'Roadmap' link in the header is present", instruction_id='62453e7c-79c9-4a17-9d73-2d21c206203c'):
        set_var('header_roadmap_link', await testmu.vision_query(page, "whether the 'Roadmap' link in the header is present", ""))
    
    async with testmu.step('Assertion check', instruction_id='0e770d88-2c50-4289-91c7-86da76233747'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the header has no 'Roadmap' link", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{header_roadmap_link}}', 'store_key': 'header_roadmap_link', 'variable_refs': {'{{header_roadmap_link}}': 'false'}}], 'sub_checks': [{'description': "the header has no 'Roadmap' link", 'store_key': 'header_roadmap_link', 'expected_value': 'false', 'extracted_value': '{{header_roadmap_link}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the header has no 'Roadmap' link"})
    
    async with testmu.step('Navigating back to the /acme/dashboard/settings/access page', instruction_id='67685c33-97a7-43da-a0ab-0610ad3f65a7'):
        await page.goto("http://localhost:3000/acme/dashboard/settings/access")
    
    async with testmu.step('Waiting for the queued Public roadmap and Save changes steps to complete', instruction_id='1b57402d-dd01-4ef4-ae14-b1651282abae'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Click "Public roadmap"', instruction_id='590f5c1d-44a0-4741-9789-711474bec3f2'):
        _loc_4 = page.locator("internal:role=switch[name=\"Public roadmap\"i]")
        
        await _loc_4.click()
    
    async with testmu.step('Click "Save changes"', instruction_id='aab32c38-793a-46b6-8fdc-777183d93202'):
        _loc_5 = page.locator("internal:role=button[name=\"Save changes\"i]")
        
        await _loc_5.click()
    
    async with testmu.step('Navigating to /acme on the website', instruction_id='a3b0aabe-a5d5-4a00-a45b-13cd3aa42124'):
        await page.goto("http://localhost:3000/acme")
    
    async with testmu.step('Checking whether the Roadmap link is present'):
        set_var('roadmap_link_back', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {5: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(5).textContent.trim() === 'Roadmap' && el(5).getAttribute('href') === '/acme/roadmap');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=link[name="Roadmap"i]'], query="whether the 'Roadmap' link is present in the page navigation", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="the 'Roadmap' link is back"))
    
    async with testmu.step('Assertion check', instruction_id='ab1b0234-54b0-4698-866c-96a91887e5bd'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the 'Roadmap' link is back", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{roadmap_link_back}}', 'store_key': 'roadmap_link_back', 'variable_refs': {'{{roadmap_link_back}}': 'true'}}], 'sub_checks': [{'description': "the 'Roadmap' link is back", 'store_key': 'roadmap_link_back', 'expected_value': 'true', 'extracted_value': '{{roadmap_link_back}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the 'Roadmap' link is back"})


if __name__ == "__main__":
    testmu.run(test)