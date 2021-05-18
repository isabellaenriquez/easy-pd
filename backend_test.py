from backend import file_exists, create_profile
import unittest

class TestFunctions(unittest.TestCase):

    def test_file_exists(self):
        # in root directory
        self.assertEqual(file_exists('data.json'), True)
        self.assertEqual(file_exists('idontexist.json'), False)

        self.assertEqual(file_exists('src/boxes/Box.svelte'), True)
        self.assertEqual(file_exists('src/idontexist.svelte'), False)
        
if __name__ == '__main__':
    unittest.main()